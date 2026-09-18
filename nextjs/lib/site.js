export const CONTACT = {
  email: 'teamomniai16@gmail.com',
  phone: '+92 324 4771948',
  whatsapp: 'https://wa.me/923244771948',
  calendly: 'https://calendly.com/javeddanish544/30min',
  linkedin: 'https://www.linkedin.com/company/teamomniai/',
  instagram: 'https://www.instagram.com/teamomniai',
  upwork: 'https://www.upwork.com/freelancers/~01550ea361f2f00af1',
  location: 'Based in Lahore, serving clients worldwide.',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export const SERVICES = [
  { n: '01', title: 'AI & Automation', desc: 'Cut manual work and answer customers instantly with AI that fits your business.', chips: ['Chatbots', 'RAG pipelines', 'Workflow automation', 'LLM integrations'], media: '/media/1.mp4', label: 'AI & AUTOMATION', headline: "Manual work is eating your team's week.", long: 'We build AI that takes real work off your plate - assistants that answer customers accurately, pipelines that read your documents, and automations that connect the tools you already use. No science projects; only AI with a measurable job.' },
  { n: '02', title: 'Backend & Frontend Development', desc: 'Fast, reliable products built to scale with you - not against you.', chips: ['Python', 'Django', 'FastAPI', 'React', 'Next.js', 'Scalable APIs'], media: '/media/2.mp4', label: 'BACKEND & FRONTEND DEVELOPMENT', headline: "Your product can't keep up with your growth.", long: 'We design and build web applications and APIs that stay fast and reliable as you scale. Clean architecture, honest estimates, and code your next team can actually work with.' },
  { n: '03', title: 'UI/UX Design', desc: 'Interfaces people understand in seconds - designed to convert, not just look good.', chips: ['User research', 'Prototypes', 'Design systems'], media: '/media/3.mp4', label: 'UI/UX DESIGN', headline: 'People visit, get confused, and leave.', long: 'Research-driven design that makes the next step obvious. We prototype before we polish, test with real users, and hand over design systems your team can extend without us.' },
  { n: '04', title: 'Data Engineering & Analytics', desc: 'Turn scattered data into dashboards and decisions you can trust.', chips: ['Data pipelines', 'Dashboards', 'Reporting'], media: null, label: 'DATA ENGINEERING & ANALYTICS', headline: "You're making decisions on gut feel.", long: "We pull your scattered data into one reliable place and turn it into dashboards and reports leadership actually reads. Know what's working before you spend more on it." },
  { n: '05', title: 'Digital Marketing & UGC Ads', desc: 'Creative and campaigns that bring the right people to what we built.', chips: ['AI UGC video ads', 'Campaign strategy', 'Content'], media: null, label: 'DIGITAL MARKETING & UGC ADS', headline: "Great product, but nobody's finding it.", long: 'AI-powered UGC video ads and campaign strategy that bring the right people to your door - then content that keeps them coming back. Creative tied to numbers, not vibes.' },
];

export const CASES = [
  {
    slug: 'ecommerce-checkout',
    cover: '/work/project-1-cover.webp',
    industry: 'E-COMMERCE',
    metric: '+38% conversion',
    title: 'Checkout that stopped leaking sales',
    problem: 'Steady ad traffic, checkout conversion stuck under 1%.',
    client: 'Aurel Home Goods',
    industryFull: 'E-commerce / D2C',
    timeline: '8 weeks',
    services: ['UI/UX Design', 'Frontend Development', 'AI & Automation'],
    heroStats: [{ v: '+38%', l: 'conversion rate' }, { v: '8 weeks', l: 'diagnosis to launch' }, { v: 'Same', l: 'ad spend' }],
    problemHeadline: "Traffic wasn't the problem. The last three clicks were.",
    problemBody: 'Aurel was spending $40k/month on ads with conversion stuck under 1%. Session recordings showed the same story on repeat: shoppers reached checkout, saw shipping costs for the first time, and left. The five-step checkout asked for account creation before payment, and on mobile - 70% of traffic - the form was a wall.',
    solutionHeadline: 'One page. Costs up front. Help where people hesitate.',
    solutionBody: 'We collapsed five steps into one page, surfaced shipping costs on the product page itself, made guest checkout the default, and added an AI sizing assistant at the exact moment size doubt caused exits.',
    resultStats: [{ v: '+38%', l: 'conversion rate' }, { v: '-33%', l: 'cart abandonment' }, { v: '-24%', l: 'size-related returns' }],
    resultBody: 'Conversion climbed from 0.9% to 1.24% within eight weeks of launch - on identical ad spend. Cart abandonment fell by a third, and the sizing assistant cut size-related returns 24%, paying for the whole project inside a quarter.',
    detailAssets: {
      before: '/work/project-1-before.webp',
      desktop: ['/work/project-1-desktop-1.webp', '/work/project-1-desktop-2.webp'],
      mobile: ['/work/project-1-mobile-1.webp', '/work/project-1-mobile-2.webp', '/work/project-1-mobile-3.webp'],
      collage: '/work/project-1-collage.webp',
    },
  },
  { slug: 'logistics-dispatch', cover: null, industry: 'LOGISTICS', metric: '30 hrs/wk saved', title: 'Dispatch without the spreadsheets', problem: 'Operations ran on five spreadsheets and group chats.' },
  { slug: 'saas-support-ai', cover: null, industry: 'SAAS', metric: '4x faster replies', title: 'AI support that customers trust', problem: 'Support team drowning in repeat questions across time zones.' },
  { slug: 'healthcare-intake', cover: null, industry: 'HEALTHCARE', metric: '12 hrs/wk saved', title: 'Patient intake on autopilot', problem: 'Clinic staff re-entering the same data into three systems.' },
  { slug: 'retail-ugc-ads', cover: null, industry: 'RETAIL', metric: '2.3x ROAS', title: 'UGC ads that finally scaled', problem: 'Paid ads spending more each month for flatter returns.' },
  { slug: 'fintech-api', cover: null, industry: 'FINTECH', metric: '99.9% uptime', title: 'An API enterprise clients trust', problem: 'A legacy API failing under load, scaring off enterprise deals.' },
];
