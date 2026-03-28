import { Sparkles, Users, Lightbulb, ShieldCheck, Mail, Linkedin } from 'lucide-react';
import './About.css';

// =============================================================================
// DATA
// =============================================================================
const VALUES = [
  {
    icon: Sparkles,
    title: 'Excellence',
    text: "Nous visons l'excellence dans chaque projet, en utilisant les meilleures pratiques et technologies.",
  },
  {
    icon: Users,
    title: 'Collaboration',
    text: 'Une approche collaborative étroite avec nos clients pour des résultats optimaux.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    text: 'Toujours à la pointe de la technologie pour offrir des solutions modernes.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité',
    text: 'Un engagement sans compromis envers la qualité et la satisfaction client.',
  },
];

const TECHNOLOGIES = [
  // Languages
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Dart', 'Flow',
  // Frontend
  'React', 'Next.js', 'Vue.js', 'Nuxt.js',
  // Mobile
  'Flutter', 'React Native',
  // Backend & Databases
  'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase'
];

const TEAM = [
  {
    name: 'Maël KEMPF--LE PAPE',
    initials: 'MK',
    imageUrl: '',
    role: 'Co-fondateur',
    bio: 'Expert en développement web et passionné par les nouvelles technologies, Maël apporte sa vision innovante et son expertise technique à chaque projet.',
    expertise: ['Développement Frontend', 'Architecture Système', 'Base de données'],
    linkedin: 'https://www.linkedin.com/in/maelklp/',
    contact: '#contact'
  },
  {
    name: 'Attilio JAEGER',
    initials: 'AJ',
    imageUrl: '',
    role: 'Co-fondateur',
    bio: "Spécialiste du développement web avec un sens aigu du design et de l'expérience utilisateur, Attilio excelle dans la création de solutions innovantes.",
    expertise: ['Design UI/UX', 'Développement Frontend', 'Architecture Système'],
    linkedin: 'https://www.linkedin.com/in/attilio-jaeger-a278842a0/',
    contact: '#contact'
  }
];

// =============================================================================
// COMPONENT
// =============================================================================
export default function About() {
  return (
    <section id="about" className="about">
      {/* Background Animated Elements */}
      <div className="about__bg-texture" />
      <div className="about__blob-1" />
      <div className="about__blob-2" />

      <div className="about__container">

        {/* =============== HISTORY HEADER =============== */}
        <div className="about__header reveal reveal--visible">
          <div className="about__badge">
            <Sparkles className="about__badge-icon" />
            <span className="about__badge-text">Notre Histoire</span>
          </div>

          <h2 className="about__title">
            Créons ensemble votre <br /><span className="about__title-gradient">avenir numérique</span>
          </h2>

          <p className="about__description">
            Fondée en 2026 par Maël KEMPF--LE PAPE et Attilio JAEGER, <span className="about__text-highlight">Sweet</span> est née de
            notre passion commune pour l'innovation numérique et d'une vision partagée :
            créer votre présence numérique et vous accompagner dans votre développement.
          </p>
          <p className="about__description">
            Notre approche combine expertise technique de pointe et créativité pour créer des
            solutions web qui dépassent les attentes. En tant que nouvelle agence, nous apportons
            un regard frais et innovant sur le développement web, tout en nous appuyant
            sur les meilleures pratiques du secteur.
          </p>
        </div>

        {/* =============== VALUES GRID =============== */}
        <div className="about__values reveal reveal-stagger reveal--visible">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="about-value">
                <div className="about-value__inner">
                  <div className="about-value__icon-wrap">
                    <Icon className="about-value__icon" strokeWidth={1.5} />
                  </div>
                  <h3 className="about-value__title">{val.title}</h3>
                  <p className="about-value__text">{val.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =============== TECH MARQUEE =============== */}
        <div className="about__tech reveal reveal--visible">
          <h3 className="about__tech-title">Nos Technologies</h3>
          <div className="about__marquee-wrapper">
            <div className="about__marquee">
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, idx) => (
                <div key={`m1-${idx}`} className="about__tech-item">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
            <div className="about__marquee" aria-hidden="true">
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, idx) => (
                <div key={`m2-${idx}`} className="about__tech-item">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =============== TEAM PROFILES =============== */}
        <div className="about__team-header reveal reveal--visible">
          <div className="about__badge" style={{ marginBottom: '1rem' }}>
            <Users className="about__badge-icon" style={{ color: 'var(--blue-500)' }} />
            <span className="about__badge-text" style={{ color: 'var(--blue-700)' }}>Notre Équipe</span>
          </div>
          <h2 className="about__team-title">Des experts passionnés à votre service</h2>
        </div>

        <div className="about__team reveal reveal-stagger reveal--visible">
          {TEAM.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-card__header">
                <div className="team-card__avatar">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="team-card__image" loading="lazy" />
                  ) : (
                    member.initials
                  )}
                </div>
                <div className="team-card__info">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                </div>
              </div>
              <p className="team-card__bio">{member.bio}</p>

              <div className="team-card__expertise-wrap">
                <p className="team-card__expertise-title">Expertise</p>
                <div className="team-card__expertise">
                  {member.expertise.map((skill, sIdx) => (
                    <span key={sIdx} className="team-card__pill">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="team-card__footer">
                <a href={member.contact} className="team-card__social team-card__social--contact">
                  <Mail size={16} /> Contact
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card__social team-card__social--linkedin">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
