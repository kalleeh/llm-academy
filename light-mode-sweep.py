#!/usr/bin/env python3
"""
Light mode sweep: transforms dark-only Tailwind classes to light+dark pairs.
Single-pass per class token to avoid double-transformation.
"""
import re
import sys

ACCENT_COLORS = ['amber', 'emerald', 'blue', 'purple', 'red', 'cyan', 'green', 'violet', 'pink', 'orange', 'rose']

# Build transformation map: existing_class -> "light_class dark:existing_class"
TRANSFORMS = {}

# Neutral backgrounds
TRANSFORMS['bg-zinc-950'] = 'bg-zinc-50 dark:bg-zinc-950'
TRANSFORMS['bg-zinc-900'] = 'bg-white dark:bg-zinc-900'
TRANSFORMS['bg-zinc-800/50'] = 'bg-zinc-100 dark:bg-zinc-800/50'
TRANSFORMS['bg-zinc-800'] = 'bg-zinc-100 dark:bg-zinc-800'
TRANSFORMS['bg-zinc-700'] = 'bg-zinc-200 dark:bg-zinc-700'

# Neutral text
TRANSFORMS['text-zinc-100'] = 'text-zinc-900 dark:text-zinc-100'
TRANSFORMS['text-zinc-200'] = 'text-zinc-800 dark:text-zinc-200'
TRANSFORMS['text-zinc-300'] = 'text-zinc-700 dark:text-zinc-300'
TRANSFORMS['text-zinc-400'] = 'text-zinc-600 dark:text-zinc-400'
TRANSFORMS['text-zinc-600'] = 'text-zinc-500 dark:text-zinc-600'

# Neutral borders
TRANSFORMS['border-zinc-700'] = 'border-zinc-200 dark:border-zinc-700'
TRANSFORMS['border-zinc-800'] = 'border-zinc-200 dark:border-zinc-800'
TRANSFORMS['border-zinc-900'] = 'border-zinc-300 dark:border-zinc-900'

# Divide
TRANSFORMS['divide-zinc-800'] = 'divide-zinc-200 dark:divide-zinc-800'

# Ring
TRANSFORMS['ring-zinc-700'] = 'ring-zinc-300 dark:ring-zinc-700'

# Placeholder
TRANSFORMS['placeholder-zinc-500'] = 'placeholder-zinc-400 dark:placeholder-zinc-500'

# Hover variants
TRANSFORMS['hover:bg-zinc-800'] = 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
TRANSFORMS['hover:bg-zinc-700'] = 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
TRANSFORMS['hover:bg-zinc-900'] = 'hover:bg-white dark:hover:bg-zinc-900'
TRANSFORMS['hover:text-zinc-100'] = 'hover:text-zinc-900 dark:hover:text-zinc-100'
TRANSFORMS['hover:text-zinc-200'] = 'hover:text-zinc-800 dark:hover:text-zinc-200'
TRANSFORMS['hover:text-zinc-300'] = 'hover:text-zinc-700 dark:hover:text-zinc-300'
TRANSFORMS['focus:ring-zinc-700'] = 'focus:ring-zinc-300 dark:focus:ring-zinc-700'

# Accent colors
for c in ACCENT_COLORS:
    TRANSFORMS[f'bg-{c}-500/5'] = f'bg-{c}-50 dark:bg-{c}-500/5'
    TRANSFORMS[f'bg-{c}-500/10'] = f'bg-{c}-50 dark:bg-{c}-500/10'
    TRANSFORMS[f'bg-{c}-500/20'] = f'bg-{c}-100 dark:bg-{c}-500/20'
    TRANSFORMS[f'bg-{c}-500/30'] = f'bg-{c}-200 dark:bg-{c}-500/30'
    TRANSFORMS[f'border-{c}-500/20'] = f'border-{c}-300 dark:border-{c}-500/20'
    TRANSFORMS[f'border-{c}-500/30'] = f'border-{c}-400 dark:border-{c}-500/30'
    TRANSFORMS[f'border-{c}-500/40'] = f'border-{c}-400 dark:border-{c}-500/40'
    TRANSFORMS[f'text-{c}-300'] = f'text-{c}-700 dark:text-{c}-300'
    TRANSFORMS[f'text-{c}-400'] = f'text-{c}-700 dark:text-{c}-400'
    TRANSFORMS[f'text-{c}-500'] = f'text-{c}-700 dark:text-{c}-500'
    TRANSFORMS[f'text-{c}-200'] = f'text-{c}-800 dark:text-{c}-200'


def transform_class_list(class_str):
    """Transform a space-separated class string. Returns (new_string, change_count)."""
    tokens = class_str.split()
    result = []
    changes = 0

    for i, token in enumerate(tokens):
        # Skip if already a dark: prefixed class
        if token.startswith('dark:'):
            result.append(token)
            continue

        # Check if this token is in our transform map
        if token in TRANSFORMS:
            # Check if the dark: version already follows (already transformed)
            dark_version = 'dark:' + token
            # Look ahead in remaining tokens
            remaining = tokens[i+1:]
            if dark_version in remaining:
                # Already has its dark: pair, skip transformation
                result.append(token)
            else:
                result.append(TRANSFORMS[token])
                changes += 1
        else:
            result.append(token)

    return ' '.join(result), changes


def process_file(filepath):
    """Process a single .tsx file, return number of class changes."""
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    total_changes = 0

    # We need to find all string literals that contain Tailwind classes
    # and transform them. We look for:
    # 1. className="..."
    # 2. className={`...`} (template literals - handle static parts)
    # 3. Object properties like color: '...' that contain class strings

    # Strategy: find all quoted strings that contain transformable classes
    # and transform them in place.

    def has_transformable(s):
        """Check if string contains any class we'd transform."""
        for key in TRANSFORMS:
            if key in s:
                # Make sure it's not already prefixed
                idx = s.find(key)
                # Check it's not preceded by "dark:" 
                prefix_start = max(0, idx - 5)
                if 'dark:' + key not in s[prefix_start:idx+len(key)+5]:
                    return True
        return False

    def transform_match(match):
        """Transform a matched string containing classes."""
        nonlocal total_changes
        quote = match.group(1)  # ' or "
        content_str = match.group(2)
        
        if not has_transformable(content_str):
            return match.group(0)
        
        # Handle template literal expressions - don't touch ${...} parts
        if '${' in content_str:
            parts = re.split(r'(\$\{[^}]*\})', content_str)
            new_parts = []
            for part in parts:
                if part.startswith('${'):
                    new_parts.append(part)
                else:
                    transformed, changes = transform_class_list(part)
                    total_changes += changes
                    new_parts.append(transformed)
            return quote + ''.join(new_parts) + quote
        else:
            transformed, changes = transform_class_list(content_str)
            total_changes += changes
            return quote + transformed + quote

    # Match double-quoted strings containing color classes
    content = re.sub(
        r'(")((?:[^"\\]|\\.)*(?:(?:bg|text|border|divide|ring|placeholder|hover:|focus:)(?:[^"\\]|\\.)*)+)"',
        transform_match,
        content
    )

    # Match single-quoted strings containing color classes
    content = re.sub(
        r"(')((?:[^'\\]|\\.)*(?:(?:bg|text|border|divide|ring|placeholder|hover:|focus:)(?:[^'\\]|\\.)*)+)'",
        transform_match,
        content
    )

    # Match backtick template literals containing color classes
    content = re.sub(
        r'(`)((?:[^`\\]|\\.)*(?:(?:bg|text|border|divide|ring|placeholder|hover:|focus:)(?:[^`\\]|\\.)*)+)`',
        transform_match,
        content
    )

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)

    return total_changes


if __name__ == '__main__':
    files = sys.argv[1:]
    for filepath in files:
        if not filepath.endswith('.tsx'):
            continue
        changes = process_file(filepath)
        if changes > 0:
            print(f"MODIFIED: {filepath}: {changes} classes updated")
        else:
            print(f"SKIPPED: {filepath}")
