export const GROUP_ICON_SVGS: Record<string, string> = {
    // Pheasants: Feather (Lucide)
    'Фазаны': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
        <path d="M16 8 2 22"/>
        <path d="M17.5 15H9"/>
    </svg>`,
    
    // Rats: Rat (Lucide)
    'Крысы': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 22H4a2 2 0 0 1 0-4h12"/>
        <path d="M13.236 18a3 3 0 0 0-2.2-5"/>
        <path d="M16 9h.01"/>
        <path d="M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3"/>
        <path d="M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18"/>
    </svg>`,
    
    // Birds: Bird (Lucide)
    'Птицы': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 7h.01"/>
        <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/>
        <path d="m20 7 2 .5-2 .5"/>
        <path d="M10 18v3"/>
        <path d="M14 17.75V21"/>
        <path d="M7 18a6 6 0 0 0 3.84-10.61"/>
    </svg>`,
    
    // Dogs: Dog (Lucide)
    'Псы': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11.25 16.25h1.5L12 17z"/>
        <path d="M16 14v.5"/>
        <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/>
        <path d="M8 14v.5"/>
        <path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
    </svg>`,
    
    // The Fourth: Digits 4 (Lucide-style custom path)
    'Четвертая': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 4v16" />
        <path d="M16 14H5l7-10" />
    </svg>`,
    
    // Educators: Key (Lucide)
    'Воспитатели': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="7.5" cy="15.5" r="5.5"/>
        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
        <path d="m21 2-9.6 9.6"/>
    </svg>`,
    
    // Others: Tornado (Lucide) - for mysterious spiral
    'Прочие': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 4H3"/>
        <path d="M18 8H6"/>
        <path d="M19 12H9"/>
        <path d="M16 16h-6"/>
        <path d="M11 20H9"/>
    </svg>`
};

export const getGroupIconDataUrl = (group: string, color: string = 'currentColor') => {
    // Default to 'Prochie' if group not found
    const svgTemplate = GROUP_ICON_SVGS[group] || GROUP_ICON_SVGS['Прочие'];
    // Replace current color with hex
    const coloredSvg = svgTemplate.replace(/stroke="currentColor"/g, `stroke="${color}"`);
    return `data:image/svg+xml;base64,${btoa(coloredSvg)}`;
};
