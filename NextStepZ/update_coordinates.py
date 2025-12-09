import re

# Tọa độ GPS cho các thành phố
coordinates = {
    'Hồ Chí Minh': [
        (10.8231, 106.6797),  # 1
        (10.8245, 106.6920),  # 3
        (10.8190, 106.7050),  # 4
        (10.8340, 106.6650),  # 6
        (10.8100, 106.7120),  # 7
        (10.8400, 106.6550),  # 9
        (10.8150, 106.6800),  # 10
        (10.8280, 106.7000),  # 12
        (10.8220, 106.6900),  # 13
        (10.8350, 106.6700),  # 15
        (10.8100, 106.7200),  # 17
        (10.8260, 106.6850),  # 18
        (10.8190, 106.7080),  # 20
        (10.8310, 106.6600),  # 22
        (10.8130, 106.7150),  # 24
    ],
    'Hà Nội': [
        (21.0285, 105.8542),  # 2
        (21.0305, 105.8445),  # 5
        (21.0265, 105.8650),  # 8
        (21.0320, 105.8400),  # 11
        (21.0245, 105.8700),  # 14
        (21.0340, 105.8350),  # 16
        (21.0280, 105.8600),  # 19
        (21.0310, 105.8480),  # 21
        (21.0250, 105.8750),  # 23
    ]
}

# Đọc file
with open('d:\\DACS2\\NextStepZ\\frontend\\lib\\companies-mock-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Cấu trúc company IDs
hcm_index = 0
hanoi_index = 0

# Thay thế từng company
def replace_company(match):
    global hcm_index, hanoi_index
    
    company_text = match.group(0)
    
    # Kiểm tra location
    if "location: 'Hồ Chí Minh'" in company_text:
        lat, lng = coordinates['Hồ Chí Minh'][hcm_index]
        hcm_index += 1
        # Thêm latitude, longitude ngay sau location
        company_text = company_text.replace(
            "location: 'Hồ Chí Minh',",
            f"location: 'Hồ Chí Minh',\n    latitude: {lat},\n    longitude: {lng},"
        )
    elif "location: 'Hà Nội'" in company_text:
        lat, lng = coordinates['Hà Nội'][hanoi_index]
        hanoi_index += 1
        company_text = company_text.replace(
            "location: 'Hà Nội',",
            f"location: 'Hà Nội',\n    latitude: {lat},\n    longitude: {lng},"
        )
    
    return company_text

# Pattern để match mỗi company object
pattern = r'\{\s*id: [\'"][^\'"]*[\'"][^}]*?employees: \[[^\]]*?\][^}]*?\}'

# Thực hiện thay thế
content = re.sub(pattern, replace_company, content, flags=re.DOTALL)

# Ghi file lại
with open('d:\\DACS2\\NextStepZ\\frontend\\lib\\companies-mock-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cập nhật tọa độ thành công!")
