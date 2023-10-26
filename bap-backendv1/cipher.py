def encrypt(inputText, n, d):
    # inputText = text to be encrypted
    # n = number of posiitons to shift characters by
    # d = direction of shift
    flippedText = inputText
    flippedText = flippedText[::-1]
    encryptedText = ""
    for i in range(len(flippedText)):
        if d == 1:
            encryptedText = encryptedText + chr((ord(flippedText[i]) - 34 + n) % 93 + 34)
        elif d == -1:
            encryptedText = encryptedText + chr(((ord(flippedText[i]) - 34) + (93 - n)) % 93 + 34)

    return encryptedText

def decrypt(inputText, n, d):
    decryptedText = ""
    for i in range(len(inputText)):
        if d == 1:
            decryptedText = decryptedText + chr(((ord(inputText[i]) - 34) + (93 - n)) % 93 + 34)
        elif d == -1:
            decryptedText = decryptedText + chr((ord(inputText[i]) - 34 + n) % 93 + 34)

    decryptedText = decryptedText[::-1]

    return decryptedText