
with open('src/components/AdminDashboard.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 0-319 (1-320) and 372-end (373-end)
# Removing 320-371 (321-372)
new_lines = lines[:320] + lines[372:]

with open('src/components/AdminDashboard.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
