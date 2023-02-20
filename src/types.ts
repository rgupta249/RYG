export interface IEquipment {
  equipment_desc: string;
  state: string;
  id: number;
}

export interface IUser {
  id: number;
  name: string;
  role: string;
}

export interface IEquipmentDetail {
  equipment_desc: string;
  state: string;
  orders: IOrderDetails[];
  historyLogs: IHistoryLogs[];
  id: number;
}
export interface IOrderDetails {
  id: number;
  equipmentId: number;
  order_desc: string;
  order_state: string;
  started_at?: string | null;
}
export interface IHistoryLogs {
  id: number;
  equipmentId: number;
  timestamp: string;
  status: string;
  orderId: number | null;
  updated_by: string;
}

export interface IState {
  key: string;
  value: string;
}

export interface IHeaders {
  key: string;
  value: string;
  align?: string;
}
