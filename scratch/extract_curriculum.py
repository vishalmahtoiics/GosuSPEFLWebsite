import zipfile, xml.etree.ElementTree as ET, sys, os

sys.stdout.reconfigure(encoding='utf-8')

docs = [
    'Qualification_File_Esports_Athlete_v2.2_1.docx',
    'Qualification_File_Esports_Coach_v2.2.docx',
    'Qualification_File_Esports_Tournament_Organiser_v1.1.docx'
]

for name in docs:
    path = os.path.join('curriculum', name)
    with zipfile.ZipFile(path) as z:
        tree = ET.fromstring(z.read('word/document.xml'))
        texts = [node.text for node in tree.iter() if node.text]
        full = ' '.join(texts)
        print(f"==================== {name} ====================")
        # Search for NOS, Structure, Modules, Hours, Key Learning
        keywords = ["National Occupational Standards", "Structure of the qualification", "Outcomes", "Module", "Hours", "Job Description"]
        for kw in keywords:
            idx = full.find(kw)
            if idx != -1:
                print(f"--- Section: {kw} ---")
                print(full[idx:idx+600])
                print("\n")
