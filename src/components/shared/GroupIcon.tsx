import React from 'react';
import { GROUP_ICON_SVGS } from '../../utils/groupIcons';

export type GroupType = 'Фазаны' | 'Крысы' | 'Птицы' | 'Псы' | 'Четвертая' | 'Воспитатели' | 'Прочие';

export const getGroupColor = (group: string) => {
    switch (group) {
        case 'Фазаны':
            return '#3b6963'; // dark teal (dried ink)
        case 'Крысы':
            return '#7f3030'; // dark blood red
        case 'Птицы':
            return '#425b7a'; // dark indigo
        case 'Псы':
            return '#5c5651'; // dark charcoal stone
        case 'Четвертая':
            return '#8a6a2e'; // dark amber/bronze
        case 'Воспитатели':
            return '#475569'; // slate 600
        default:
            return '#5e5a56'; // dark gray
    }
};

interface GroupIconProps extends React.HTMLAttributes<HTMLDivElement> {
    group: string;
    size?: number | string;
    color?: string;
}

export const GroupIcon: React.FC<GroupIconProps> = ({ group, color, size = 24, style, ...props }) => {
    // If color is provided as prop, use it. Otherwise get default group color.
    const iconColor = color || getGroupColor(group);

    // Default to 'Prochie' if group not found
    const svgHTML = GROUP_ICON_SVGS[group] || GROUP_ICON_SVGS['Прочие'];

    return (
        <div
            {...props}
            style={{
                ...style,
                color: iconColor,
                width: size,
                height: size,
                display: 'inline-block',
                lineHeight: 0
            }}
            dangerouslySetInnerHTML={{ __html: svgHTML }}
        />
    );
};
