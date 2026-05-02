import { useI18n } from './context';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
      title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <span className="text-xs font-medium">
        {lang === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  );
}
