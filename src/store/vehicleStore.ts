import { makeAutoObservable, runInAction } from 'mobx';
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
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const data = await fetchVehicles();
      runInAction(() => {
        this.vehicles = data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = (e as Error).message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  removeVehicle(id: number) {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }

  updateVehicle(id: number, data: { name: string; price: number }) {
    this.vehicles = this.vehicles.map((v) => (v.id === id ? { ...v, ...data } : v));
  }
}

export const vehicleStore = new VehicleStore();
