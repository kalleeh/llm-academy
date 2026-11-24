"""Visitor counter for llm-academy.

POST /api/visit  body: {"new": true|false}
  - new=true  -> count one unique visitor (total + per-country)
  - new=false -> only read the stats
Returns: {"total": int, "countries": [{"code": "SE", "count": 3}, ...]}

The country comes from the CloudFront-Viewer-Country header, which CloudFront
adds via the origin request policy attached to the /api/* behavior.
"""
import base64
import json
import os
import re

import boto3

TABLE = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
COUNTRY_RE = re.compile(r"^[A-Z]{2}$")
MAX_BODY = 1024


def _resp(status, body):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json", "cache-control": "no-store"},
        "body": json.dumps(body),
    }


def _stats():
    items = []
    kwargs = {}
    while True:
        page = TABLE.scan(**kwargs)
        items.extend(page.get("Items", []))
        if "LastEvaluatedKey" not in page:
            break
        kwargs["ExclusiveStartKey"] = page["LastEvaluatedKey"]
    total = 0
    countries = []
    for it in items:
        pk = it["pk"]
        if pk == "total":
            total = int(it["count"])
        elif pk.startswith("country#"):
            countries.append({"code": pk[8:], "count": int(it["count"])})
    countries.sort(key=lambda c: -c["count"])
    return {"total": total, "countries": countries}


def _incr(pk):
    TABLE.update_item(
        Key={"pk": pk},
        UpdateExpression="ADD #c :one",
        ExpressionAttributeNames={"#c": "count"},
        ExpressionAttributeValues={":one": 1},
    )


def handler(event, _context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    if method != "POST":
        return _resp(405, {"error": "method not allowed"})

    raw = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        try:
            raw = base64.b64decode(raw).decode("utf-8")
        except (ValueError, UnicodeDecodeError):
            return _resp(400, {"error": "bad request"})
    if len(raw) > MAX_BODY:
        return _resp(413, {"error": "too large"})
    try:
        is_new = json.loads(raw).get("new") is True
    except (ValueError, AttributeError):
        return _resp(400, {"error": "bad request"})

    if is_new:
        headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
        country = (headers.get("cloudfront-viewer-country") or "").upper()
        if not COUNTRY_RE.match(country):
            country = "XX"  # unknown
        _incr("total")
        _incr("country#" + country)

    return _resp(200, _stats())
