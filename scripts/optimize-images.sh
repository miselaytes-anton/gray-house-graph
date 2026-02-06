#!/bin/bash

# Script to optimize PNG images using ffmpeg
# Resizes images to max 512px and applies maximum compression

# Default directory if none provided
TARGET_DIR="${1:-src/assets/avatars}"

# Get the script's directory to resolve relative paths from project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Resolve the target directory
if [[ "$TARGET_DIR" = /* ]]; then
    # Absolute path
    FULL_PATH="$TARGET_DIR"
else
    # Relative path from project root
    FULL_PATH="$PROJECT_ROOT/$TARGET_DIR"
fi

# Check if directory exists
if [ ! -d "$FULL_PATH" ]; then
    echo "Error: Directory '$FULL_PATH' does not exist"
    exit 1
fi

echo "Optimizing PNG images in: $FULL_PATH"
echo "----------------------------------------"

# Change to target directory
cd "$FULL_PATH" || exit 1

# Count total files
TOTAL=$(ls -1 *.png 2>/dev/null | wc -l | tr -d ' ')

if [ "$TOTAL" -eq 0 ]; then
    echo "No PNG files found in directory"
    exit 0
fi

echo "Found $TOTAL PNG files to optimize"
echo ""

# Process each PNG file
COUNT=0
for file in *.png; do
    COUNT=$((COUNT + 1))
    echo "[$COUNT/$TOTAL] Processing: $file"
    
    ffmpeg -i "$file" \
        -vf "scale='min(512,iw)':'min(512,ih)':force_original_aspect_ratio=decrease" \
        -compression_level 9 \
        -pix_fmt rgba \
        "optimized_$file" \
        -y \
        -loglevel error 2>&1
    
    if [ $? -eq 0 ]; then
        mv "optimized_$file" "$file"
        echo "  ✓ Optimized successfully"
    else
        echo "  ✗ Failed to optimize"
        rm -f "optimized_$file"
    fi
    echo ""
done

echo "----------------------------------------"
echo "Optimization complete!"
