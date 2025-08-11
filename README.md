# 🚀 Developer Portfolio

A modern, responsive portfolio website built with Next.js 15, featuring a complete admin panel for project management.

## ✨ Features

- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern Design** - Clean UI with consistent design tokens
- 🔐 **Admin Panel** - Password-protected project management
- 📸 **Image Upload** - Direct file upload for project images
- 🚀 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ⚡ **Fast Performance** - Next.js 15 with Turbopack
- 🎯 **Dynamic Content** - File-based project data management

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Development**: ESLint, Prettier
- **Build**: Turbopack
- **Deployment**: Vercel
- **Admin**: Basic HTTP Authentication
- **File Upload**: Local file storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd Portfolio

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your admin password

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

### Environment Variables

Create a `.env.local` file:

```env
ADMIN_PASSWORD=your-secure-password-here
```

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
npm run pre-deploy   # Run all checks and build
npm run deploy-check # Quick deployment readiness check
```

## 🌐 Deployment on Vercel

### 1. Pre-deployment Check

```bash
# Ensure everything is ready
npm run deploy-check

# Test build locally
npm run pre-deploy
```

### 2. Deploy Options

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option B: GitHub Integration

1. Push your code to GitHub
2. Connect repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Deploy automatically on every push

### 3. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: Your secure admin password
   - **Environments**: Production, Preview, Development
3. **Redeploy** your project

### 4. Generate Secure Password

```bash
# Generate a strong password
openssl rand -base64 32
```

## 🔐 Admin Panel

### Access

- URL: `https://your-domain.vercel.app/admin`
- Username: `admin`
- Password: Your `ADMIN_PASSWORD`

### Features

- ➕ Add new projects
- ✏️ Edit existing projects
- 🗑️ Delete projects
- 📸 Upload project images
- 📊 View project statistics
- 🔍 Real-time preview

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js 15 app directory
│   ├── admin/             # 🔐 Admin panel pages
│   ├── api/               # 🌐 API routes
│   ├── projects/          # 📄 Project pages
│   └── globals.css        # 🎨 Global styles
├── components/            # ⚛️ React components
├── lib/                  # 🛠️ Utility functions
├── types/                # 📝 TypeScript definitions
├── data/                 # 💾 Data files (projects.json)
├── public/               # 📸 Static assets
│   └── uploads/          # 📁 Uploaded images
├── middleware.ts         # 🔒 Authentication
├── vercel.json          # ⚙️ Vercel config
└── README.md            # 📖 This file
```

## 🔒 Security Features

- 🛡️ HTTP Basic Authentication for admin
- 🔐 Protected API endpoints
- 🚫 Security headers (CSRF, XSS protection)
- 🤖 Admin routes excluded from search engines
- 📁 File upload validation
- 🔍 Input sanitization

## 🎨 Customization

### Update Your Information

1. **Developer Info**: Edit `data/developer.json`
2. **Projects**: Use admin panel or edit `data/projects.json`
3. **Styling**: Modify `app/globals.css` for design tokens
4. **Components**: Update components in `/components`

### Add New Sections

1. Create new page in `app/`
2. Add navigation link in components
3. Update types if needed

## 🐛 Troubleshooting

### Common Issues

**Build Errors**:

```bash
npm run type-check  # Check TypeScript errors
npm run lint:fix    # Fix linting issues
```

**Admin Access Issues**:

- Check `ADMIN_PASSWORD` in environment variables
- Verify middleware configuration
- Check browser developer tools for auth errors

**Image Upload Issues**:

- Ensure `/public/uploads` directory exists
- Check file size limits (5MB max)
- Verify supported formats: JPEG, PNG, WebP, GIF

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run checks: `npm run deploy-check`
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ and Next.js**

Need help? Open an issue or contact me!
