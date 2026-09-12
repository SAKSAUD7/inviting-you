import os
from PIL import Image

def process_image(input_path, output_path, crop_box=None):
    img = Image.open(input_path).convert("RGBA")
    
    if crop_box:
        img = img.crop(crop_box)
        
    # Get the background color from a spot that is likely background
    bg_color = img.getpixel((10, 10))
    
    tolerance = 20
    
    data = img.getdata()
    new_data = []
    for item in data:
        # Check if color is close to background
        if abs(item[0] - bg_color[0]) < tolerance and \
           abs(item[1] - bg_color[1]) < tolerance and \
           abs(item[2] - bg_color[2]) < tolerance:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Processed {input_path} -> {output_path}")

base_dir = r"c:\Users\saksa\OneDrive\Desktop\inviting you\inviting-you"
input_dir = os.path.join(base_dir, "public", "images")
output_dir = os.path.join(base_dir, "public", "templates", "birthday")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

files = [
    "WhatsApp Image 2026-09-09 at 3.55.36 AM.jpeg",
    "WhatsApp Image 2026-09-09 at 3.55.37 AM (1).jpeg",
    "WhatsApp Image 2026-09-09 at 3.55.37 AM (2).jpeg",
    "WhatsApp Image 2026-09-09 at 3.55.37 AM (3).jpeg",
    "WhatsApp Image 2026-09-09 at 3.55.37 AM.jpeg"
]

for idx, filename in enumerate(files):
    in_path = os.path.join(input_dir, filename)
    out_path = os.path.join(output_dir, f"asset_{idx}.png")
    
    if os.path.exists(in_path):
        img = Image.open(in_path)
        w, h = img.size
        # Crop out the browser UI (top ~15%) and bottom app UI (bottom ~15%)
        crop_box = (w*0.1, h*0.2, w*0.9, h*0.8)
        try:
            process_image(in_path, out_path, crop_box)
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
    else:
        print(f"File not found: {in_path}")
