import os
import sys
from rembg import remove
from PIL import Image

start = int(sys.argv[1])
limit = int(sys.argv[2])

input_folder = "PNG"
output_folder = "PNG_TRANSPARENT"

os.makedirs(output_folder, exist_ok=True)

files = sorted([f for f in os.listdir(input_folder) if f.endswith(".png")])
selected = files[start:start+limit]

for i, file in enumerate(selected, 1):
    input_path = os.path.join(input_folder, file)
    output_path = os.path.join(output_folder, file)

    if os.path.exists(output_path):
        continue

    try:
        with Image.open(input_path) as img:
            result = remove(img)
            result.save(output_path)
        print(f"[{i}/{len(selected)}] Done: {file}")
    except Exception as e:
        print("Error:", file, e)

print("Batch Completed ✅")
