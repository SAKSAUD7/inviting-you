from PIL import Image
import os

def remove_white_background(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # threshold for considering a pixel "white"
    threshold = 240
    
    for item in datas:
        # if the pixel is near white, make it transparent
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(image_path, "PNG")
    print(f"Saved {image_path}")

images_to_process = [
    "public/images/noor-mehrab-gold.png",
    "public/images/noor-jasmine-garland.png",
    "public/images/noor-islamic-rosette.png"
]

for img_path in images_to_process:
    if os.path.exists(img_path):
        remove_white_background(img_path)
    else:
        print(f"File not found: {img_path}")
