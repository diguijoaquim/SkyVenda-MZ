from tkinter import Tk, filedialog
from PIL import Image
import pytesseract

# Configurar o caminho do Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Função para selecionar uma imagem e extrair texto
def selecionar_e_extrair_texto():
    # Configuração inicial do diálogo
    root = Tk()
    root.withdraw()  # Oculta a janela principal do Tkinter
    root.wm_attributes('-topmost', 1)  # Mantém o diálogo no topo

    # Abrir o diálogo para selecionar o arquivo
    caminho_imagem = filedialog.askopenfilename(
        title="Selecione uma imagem",
        filetypes=[("Imagens", "*.png;*.jpg;*.jpeg;*.bmp;*.tiff")]
    )

    # Verificar se o usuário selecionou um arquivo
    if not caminho_imagem:
        print("Nenhuma imagem foi selecionada.")
        return

    try:
        # Carregar a imagem
        imagem = Image.open(caminho_imagem)

        # Extrair o texto da imagem
        texto_extraido = pytesseract.image_to_string(imagem)
        print("Texto extraído da imagem:")
        print(texto_extraido)

    except Exception as e:
        print(f"Ocorreu um erro ao processar a imagem: {e}")

# Chamar a função
selecionar_e_extrair_texto()
