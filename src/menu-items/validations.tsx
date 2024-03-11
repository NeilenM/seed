import { Flash } from "iconsax-react";
import { NavItemType } from "types/menu";

const icons = {
    validations: Flash
}

const validations: NavItemType = {
    id: 'validations',
    title: 'Validations',
    icon: icons.validations,
    type: 'collapse',
    children: [
        {
            id: 'inputs',
            title: 'Inputs',
            url: '/forms/validation',
            type: 'item'
        }
    ]
}

export default validations