export default interface IListUsersResponse {
  data: [
    {
      id: string;
      name: string;
      email: string;
      code: string;
      document: string;
      document_type: string;
      type: string;
      gender: string;
      delinquent: boolean;
      created_at: string;
      updated_at: string;
      birthdate: string;
      phones: {
        home_phone: {
          country_code: string;
          number: string;
          area_code: string;
        };
        mobile_phone: {
          country_code: string;
          number: string;
          area_code: string;
        };
      };
    },
  ];

  paging: {
    total: number;
    next: string;
  };
}
