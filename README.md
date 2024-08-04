# KickDCBOT - Discord Kick Subscriber Role Bot

### [:gb: English](#english) | [:tr: Türkçe](#türkçe)

## English

The Discord Kick Subscriber Role Bot is designed to automatically assign special roles to your Kick subscribers in your Discord server. By synchronizing Kick subscriptions with Discord roles, you can offer your subscribers more privileges and customization options on your server.

### Features

-   **Automatic Role Assignment**: Automatically assigns your Kick subscribers the "CLIENT_ROLE_NAME" role in your Discord server.
-   **Kick Integration**: Checks subscription status using the Kick API.
-   **Easy Setup**: Start using the bot quickly with a simple and fast installation process.
-   **Secure and Customizable**: Easily customize your bot to fit your needs.

### Setup

-   **Clone the repository**:
    ```bash
    git clone https://github.com/Gurkankaradag0/kickdcbot.git
    cd kickdcbot
    ```
-   **Install dependencies**:

    ```bash
    npm install
    npm run playwright
    ```

-   **Create a Discord Bot**:

    -   Create a new bot on the [Discord Developer Portal](https://discord.com/developers), get your client token and client id.
    -   Grant your bot server management permissions.

-   **Create a Kick Account**:

    -   Create a new account on the [Kick](https://kick.com).

-   **Environment Variables**:

    -   Rename the `.env.example` file to `.env`
    -   Enter the required information:

        ```bash
        CLIENT_TOKEN=YOUR_DISCORD_CLIENT_TOKEN
        CLIENT_ID=YOUR_DISCORD_CLIENT_ID

        MONGODB_URI=YOUR_MONGODB_URI

        KICK_BOT_NAME=YOUR_BOT_CHANNEL_NAME
        KICK_CHANNEL_NAME=YOUR_CHANNEL_NAME

        SECRET_KEY=YOUR_SECRET_KEY_16_BYTES
        ```

### Run Project

```bash
npm run v1
```

## Türkçe

Discord Kick Abone Rolü Botu, Kick abonelerinize Discord sunucunuzda otomatik olarak özel roller vermek için geliştirilmiştir. Kick abonelikleri ile Discord rollerini senkronize ederek, abonelerinize sunucunuzda daha fazla ayrıcalık ve özelleştirme imkanı sunabilirsiniz.

### Özellikler

-   **Otomatik Rol Atama**: Discord sunucunuzda Kick abonelerinize otomatik olarak "CLIENT_ROLE_NAME" rolünü atar.
-   **Kick Entegrasyonu**: Kick API'sini kullanarak abonelik durumlarını kontrol eder.
-   **Kolay Kurulum**: Basit ve hızlı kurulum süreci sayesinde botu kolayca kullanmaya başlayabilirsiniz.
-   **Güvenli ve Özelleştirilebilir**: Botunuzu kendi ihtiyaçlarınıza göre kolayca özelleştirebilirsiniz.

### Kurulum

-   **Depoyu klonla**:
    ```bash
    git clone https://github.com/Gurkankaradag0/kickdcbot.git
    cd kickdcbot
    ```
-   **Bağımlılıkları yükleyin**:

    ```bash
    npm install
    npm run playwright
    ```

-   **Discord Botu Oluşturma**:

    -   [Discord Geliştirici Portalı](https://discord.com/developers)'nda yeni bir bot oluşturun, istemci token'ınızı ve istemci kimliğinizi alın.
    -   Botunuza sunucu yönetimi izinlerini verin.

-   **Kick Hesabı Oluşturma**:

    -   [Kick](https://kick.com)'de yeni bir hesap oluşturun.

-   **Çevresel Değişkenler**:

    -   `.env.example` dosyasının adını `.env` olarak değiştirin
    -   Gerekli bilgileri giriniz:

        ```bash
        CLIENT_TOKEN=YOUR_DISCORD_CLIENT_TOKEN
        CLIENT_ID=YOUR_DISCORD_CLIENT_ID

        MONGODB_URI=YOUR_MONGODB_URI

        KICK_BOT_NAME=YOUR_BOT_CHANNEL_NAME
        KICK_CHANNEL_NAME=YOUR_CHANNEL_NAME

        SECRET_KEY=YOUR_SECRET_KEY_16_BYTES
        ```

### Projeyi çalıştır

```bash
npm run v1
```

### Donate

[![Build](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/gurkankrdg)

### Social

[![Linkedin](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gurkankaradag/)
