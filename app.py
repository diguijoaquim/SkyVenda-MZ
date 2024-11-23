import google.generativeai as genai
import os

# Configuração da chave da API Gemini
genai.configure(api_key="AIzaSyBtmW-jLX6FX8gcmwZrEGks19v5BNTqtt8")

data = {
    "products": [
        {"id": 1, "name": "Smartphone", "category": "Electronics"},
        {"id": 2, "name": "Laptop", "category": "Electronics"},
        {"id": 3, "name": "Headphones", "category": "Accessories"},
        {"id": 4, "name": "Keyboard", "category": "Accessories"},
        {"id": 5, "name": "Office Chair", "category": "Furniture"},
        {"id": 6, "name": "Table Lamp", "category": "Furniture"},
        {"id": 7, "name": "Notebook", "category": "Stationery"},
        {"id": 8, "name": "Pen Set", "category": "Stationery"},
        {"id": 9, "name": "Backpack", "category": "Bags"},
        {"id": 10, "name": "Travel Mug", "category": "Kitchenware"}
    ],
    "users": [
        {"id": 1, "name": "Alice", "preferences": ["Electronics", "Accessories"]},
        {"id": 2, "name": "Bob", "preferences": ["Furniture", "Stationery"]},
        {"id": 3, "name": "Charlie", "preferences": ["Kitchenware", "Bags"]}
    ]
}

# Solicita o ID do usuário
user_id = int(input("Digite o ID do usuário para recomendações (1-3): "))

# Encontra o usuário
user = next((u for u in data["users"] if u["id"] == user_id), None)

if not user:
    print(f"Usuário com ID {user_id} não encontrado.")
else:
    # Formata a entrada para o modelo de IA
    prompt = f"""
    Aqui estão os produtos disponíveis:
    {data['products']}

    Aqui estão os usuários e suas preferências:
    {data['users']}

    Faça uma lista de produtos recomendados para o usuário com ID {user_id}, considerando suas preferências.
    """

    # Gera a recomendação usando o modelo Gemini
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)
    
    # Extrai a resposta gerada pelo modelo e formata como um JSON
    recommendations = response.text.strip().split("\n")
    result = {
        "user_id": user_id,
        "recommendations": recommendations
    }

    # Retorna o JSON com as recomendações
    print(result)
