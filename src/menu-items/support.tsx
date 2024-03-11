// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2, TableDocument, Driving, Flash } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  samplePage: DocumentCode2,
  tableDocument: TableDocument,
  roadmap: Driving,
  validations: Flash
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support: NavItemType = {
  id: 'other',
  title: 'principales',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Otra página',
      type: 'item',
      url: '/sample-page',
      icon: icons.samplePage
    },
    {
      id: 'table',
      title: 'Tabla de valores',
      type: 'item',
      url: '/table',
      icon: icons.tableDocument
    },
    {
      id: 'validations',
      title: 'Validaciones',
      type: 'collapse',
      icon: icons.validations,
      children: [
        {
          id: 'validator',
          title: 'Inputs',
          type: 'item',
          url: '/forms/validation',
        }
      ]
    },


    // {
    //   id: 'documentation',
    //   title: "documentation",
    //   type: 'item',
    //   url: 'https://phoenixcoded.gitbook.io/able-pro/v/react/',
    //   icon: icons.documentation,
    //   external: true,
    //   target: true,
    //   chip: {
    //     label: 'gitbook',
    //     color: 'info',
    //     size: 'small'
    //   }
    // },
    // {
    //   id: 'roadmap',
    //   title: <FormattedMessage id="roadmap" />,
    //   type: 'item',
    //   url: 'https://phoenixcoded.gitbook.io/able-pro/v/react/roadmap',
    //   icon: icons.roadmap,
    //   external: true,
    //   target: true
    // }
  ]
};

export default support;
