import os

def replace_image_paths(root_folder):
    for subdir, _, files in os.walk(root_folder):
        for filename in files:
            if filename.endswith(('.html', '.js', '.css')):  # only edit web files
                filepath = os.path.join(subdir, filename)
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()

                # Replace only if the problematic paths exist
                updated_content = content.replace('/static/pdf.png', 'static/pdf.png')
                updated_content = updated_content.replace('/static/dark.png', 'static/dark.png')

                # Only write back if changes were made
                if content != updated_content:
                    with open(filepath, 'w', encoding='utf-8') as file:
                        file.write(updated_content)
                    print(f"✅ Updated: {filepath}")

folder = input("Enter your project folder path: ").strip()
replace_image_paths(folder)
