export const headerArrHistory = [
  {
    key: 1,
    value: "Order",
  },
  {
    key: 2,
    value: "Status",
    align: "center",
  },
  {
    key: 3,
    value: "Updated by",
    align: "center",
  },
  {
    key: 4,
    value: "Updated at",
    align: "right",
  },
];

export const headerArrOrders = [
    {
      key: 1,
      value: "Order",
    },
    {
      key: 2,
      value: "Status",
    },
    {
      key: 3,
      value: "Updated at",
      align: "right",
    },
  ];
  
  export const headerArrList = (length: number) => [
    {
      key: 1,
      value: `Equipments(${length})`,
    },
    {
      key: 2,
      value: "State",
      align: "right",
    },
  ];