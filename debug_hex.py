
with open('src/components/AdminDashboard.tsx', 'rb') as f:
    lines = f.readlines()
    print(lines[318].hex()) # 0-indexed, so 319 is index 318
