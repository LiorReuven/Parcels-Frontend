import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsBookshelf } from 'react-icons/bs';
import { TbReportSearch, TbTruckDelivery } from 'react-icons/tb';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RiArrowUpSFill } from 'react-icons/ri';
import { IoIosCreate } from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Main',
    path: '/dashboard',
    icon: <AiFillHome />,
  },
  {
    title: 'Storages',
    path: '/dashboard/storages',
    icon: <BsBookshelf />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'All Storages',
        path: '/dashboard/storages',
        icon: <BsBookshelf />,
      },
      {
        title: 'Create Storage',
        path: '/dashboard/storages/create',
        icon: <IoIosCreate />,
      },
    ],
  },
  {
    title: 'Companies',
    path: '/dashboard/companies',
    icon: <TbTruckDelivery />,
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: <TbReportSearch />,
  },
];
