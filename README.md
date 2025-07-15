# InstaStartup - AI Startup Generator

Transform your startup idea into a complete business package with AI. Generate brand names, logos, landing pages, pitch decks, and deployable code in minutes.

## 🚀 Features

- **AI-Powered Generation**: Uses GPT-4 to create comprehensive startup packages
- **Complete Branding**: Brand names, taglines, logos, and color schemes
- **Landing Page**: Fully functional website with marketing content
- **Business Materials**: Investor-ready pitch decks and business documentation
- **Social Media Content**: Ready-to-post content for LinkedIn, Twitter, and Instagram
- **Code Generation**: Complete Next.js application with TypeScript
- **One-Click Deploy**: Deploy to Vercel with a single click
- **Beautiful UI**: Premium glassmorphism design with dark/light mode

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: OpenAI GPT-4 & DALL·E 3
- **Deployment**: Vercel
- **UI Components**: Radix UI with shadcn/ui

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/instastartup.git
cd instastartup
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
   - OpenAI API key
   - Firebase configuration
   - Google API credentials (optional)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### OpenAI Setup
1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file

### Firebase Setup
1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore and Authentication
3. Copy the configuration to your `.env.local` file

### Google Slides API (Optional)
1. Enable the Google Slides API in [Google Cloud Console](https://console.cloud.google.com/)
2. Create credentials and add them to your `.env.local` file

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern glass-like UI elements
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Mode**: Seamless theme switching
- **Loading States**: Beautiful loading animations
- **Error Handling**: Graceful error states

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── generate-startup/
│   ├── result/
│   │   └── [id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── startup-form.tsx
│   ├── loading-state.tsx
│   ├── result-display.tsx
│   └── theme-toggle.tsx
├── firebase/
│   └── firebase.ts
├── utils/
│   └── startup-generator.ts
└── ...
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🔮 Future Extensions

- **Stripe Integration**: Paid plans and subscriptions
- **Multi-user Dashboard**: User accounts and project management
- **AI Idea Validator**: Validate and score startup ideas
- **Mobile App Generator**: Generate React Native apps
- **AI Co-founder Chatbot**: Business planning and roadmapping

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 and DALL·E 3
- Vercel for hosting and deployment
- Firebase for backend services
- The open-source community for amazing tool
