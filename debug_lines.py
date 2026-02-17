
with open('src/components/AdminDashboard.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i in range(318, 324):
        print(f"{i+1}: {repr(lines[i])}")
