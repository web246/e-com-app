import { toast } from '@/components/ui/use-toast';

const providers = [
  {
    id: 'apple',
    label: 'Apple',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
        <path d="M16.365 1.43c0 1.14-.42 2.2-1.18 3.02-.82.88-2.16 1.56-3.3 1.47-.15-1.1.4-2.26 1.17-3.06.83-.88 2.26-1.53 3.31-1.43zM20.5 17.2c-.55 1.26-.82 1.82-1.54 2.94-.99 1.54-2.39 3.46-4.13 3.48-1.55.02-1.95-.99-4.06-.98-2.1.01-2.55 1-4.1.98-1.74-.02-3.07-1.75-4.06-3.28C.7 17.5-.3 13.7 1.2 11.1c.9-1.55 2.33-2.53 3.95-2.55 1.55-.03 3.01 1.05 4.06 1.05 1.05 0 2.7-1.3 4.55-1.11.78.03 2.97.31 4.38 2.35-3.84 2.1-3.22 7.58.36 9.36z" />
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z" />
        <path fill="#34A853" d="M6.6 14.3l-.8.6-2.7 2.1C4.7 20 8.1 22 12 22c2.7 0 4.9-.9 6.5-2.4l-3.1-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1z" />
        <path fill="#4A90E2" d="M3.1 7.1C2.4 8.5 2 10.2 2 12s.4 3.5 1.1 4.9l3.5-2.7C6.2 13.4 6 12.7 6 12s.2-1.4.6-2.1L3.1 7.1z" />
        <path fill="#FBBC05" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.7 14.7 2 12 2 8.1 2 4.7 4 3.1 7.1l3.5 2.7C7.2 7.5 9.4 5.8 12 5.8z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2" aria-hidden>
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06z" />
      </svg>
    ),
  },
];

export default function SocialAuthRow({ mode = 'sign in' }) {
  const handleClick = (label) => {
    toast({
      title: `${label} ${mode} coming soon`,
      description: 'Email authentication is available now.',
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-[#E8E8E8]" />
        <span className="text-xs text-[#8A8A8A] whitespace-nowrap">
          Or {mode} with
        </span>
        <div className="h-px flex-1 bg-[#E8E8E8]" />
      </div>
      <div className="flex items-center justify-center gap-5">
        {providers.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            aria-label={`${mode} with ${label}`}
            onClick={() => handleClick(label)}
            className="w-12 h-12 rounded-full bg-[#F3F3F3] flex items-center justify-center text-[#1A1A1A] hover:bg-[#EAEAEA] transition-colors"
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
