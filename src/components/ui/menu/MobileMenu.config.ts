export const MOBILE_MENU_CONFIG = {
    breakpoint: 768,
    animationDuration: 300,
    overlayZIndex: 40,
    menuZIndex: 50,
} as const;

export interface NavItem {
    href: string;
    labelKey: string;
}