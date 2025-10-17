# Portfolio Website

A modern, single-page scrolling portfolio built with React, TypeScript, TailwindCSS, and Framer Motion.

## Features

- Smooth scroll navigation with sticky navbar
- Glassmorphism design with neon glow effects
- GitHub API integration for projects
- Hashnode API integration for blog posts
- WakaTime integration for coding activity
- Formspree integration for contact form
- Fully responsive design
- Advanced animations with Framer Motion
- SEO-friendly with meta tags

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your configuration:

```
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_HASHNODE_USERNAME=your-username
NEXT_PUBLIC_WAKATIME_API_KEY=your-api-key
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-form-id
```

4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### GitHub Projects
Update the repository names in `sections/projects.tsx`:
\`\`\`typescript
const repoNames = ["repo1", "repo2", "repo3"]
\`\`\`

### Hashnode Blogs
Update your Hashnode username in `sections/blogs.tsx`

### WakaTime Stats
Add your WakaTime API key to environment variables

### Contact Form
Create a form at [formspree.io](https://formspree.io) and add the form ID to environment variables

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

Or deploy manually:
\`\`\`bash
npm run build
npm start
\`\`\`

## Customization

- Update personal information in each section
- Modify colors in `app/globals.css`
- Add your social links in `sections/contact.tsx`
- Update footer information in `sections/footer.tsx`

## License

MIT
