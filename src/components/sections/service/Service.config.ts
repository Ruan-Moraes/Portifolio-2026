import {
    ApiIcon,
    DatabaseIcon,
    MaintenanceIcon,
    WebDevIcon,
} from '../../icons/Icons.tsx';

interface Service {
    icon: React.ReactNode;
    titleKey: string;
    descriptionKey: string;
}

export const servicesData: Service[] = [
    {
        icon: WebDevIcon(),
        titleKey: 'services.webDev.title',
        descriptionKey: 'services.webDev.description',
    },
    {
        icon: ApiIcon(),
        titleKey: 'services.api.title',
        descriptionKey: 'services.api.description',
    },
    {
        icon: DatabaseIcon(),
        titleKey: 'services.database.title',
        descriptionKey: 'services.database.description',
    },
    {
        icon: MaintenanceIcon(),
        titleKey: 'services.maintenance.title',
        descriptionKey: 'services.maintenance.description',
    },
];
