import { makeAutoObservable } from 'mobx';
import { fetchVehicles } from '@/services/vehicleApi';
import type { Vehicle } from '@/types/vehicle';

class VehicleStore {
  vehicles: Vehicle[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadVehicles() {
    this.isLoading = true;
    try {
      const data = await fetchVehicles();
      this.vehicles = data;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}

export const vehicleStore = new VehicleStore();
