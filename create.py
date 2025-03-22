import os

# Define the base directory where the folders and files will be created
base_dir = "uploads"

# Define years and semesters
years = [2023, 2022, 2021, 2020, 2019]
semesters = range(1, 9)  # 1st to 8th semester

# Create the required folder structure
for year in years:
    year_path = os.path.join(base_dir, str(year))
    os.makedirs(year_path, exist_ok=True)
    
    # Create year index.html
    with open(os.path.join(year_path, "index.html"), "w") as f:
        f.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Select Semester - {year}</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
        }}
        .container {{
            margin-top: 50px;
        }}
        .semester-container {{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }}
        .semester-link {{
            padding: 15px 25px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
        }}
        .semester-link:hover {{
            background-color: #218838;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Select Semester for {year}</h1>
        <div class="semester-container">
            {''.join(f'<a href=\"semester/{sem}/index.html\" class=\"semester-link\">Semester {sem}</a>' for sem in semesters)}
        </div>
    </div>
</body>
</html>""")

    for sem in semesters:
        sem_path = os.path.join(year_path, f"semester/{sem}")
        os.makedirs(sem_path, exist_ok=True)

        # Create semester index.html
        with open(os.path.join(sem_path, "index.html"), "w") as f:
            f.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semester {sem} - {year} Question Papers</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
        }}
        .container {{
            margin-top: 50px;
        }}
        .pdf-container {{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-top: 20px;
        }}
        .pdf-link {{
            padding: 10px 20px;
            background-color: #17a2b8;
            color: white;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
        }}
        .pdf-link:hover {{
            background-color: #138496;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Semester {sem} - {year} Question Papers</h1>
        <p>Select a subject to download:</p>
        <div class="pdf-container">
            <a href="subject1.pdf" class="pdf-link">Subject 1</a>
            <a href="subject2.pdf" class="pdf-link">Subject 2</a>
            <a href="subject3.pdf" class="pdf-link">Subject 3</a>
        </div>
    </div>
</body>
</html>""")

print("Folder structure and HTML files created successfully.")
    