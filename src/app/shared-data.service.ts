import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Initialize a BehaviorSubject with a default value
  private sharedValue = new BehaviorSubject<string>('default value');

  private screensList = new BehaviorSubject<Array<any>>([]);
  private LayersList = new BehaviorSubject<Array<any>>([
  ]);
  private selectedItem = new BehaviorSubject<Object>([
  ]);

  lastUpdatedScreen: number

  // Observable for shared value
  currentValue = this.sharedValue.asObservable();
  screensListValue = this.screensList.asObservable();
  LayersListValue = this.LayersList.asObservable();
  selectedItemValue = this.selectedItem.asObservable();

  constructor() { }

  setSelectedItem(value: any) {
    this.selectedItem.next(value);
  }
  // Method to change the shared value
  changeValue(value: string) {
    this.sharedValue.next(value);
  }

  changeLayerProperty(layerID: number | string, property: string, value: any) {
    // Clone the existing LayersList to avoid direct mutations
    let updatedLayersList: any = [...this.LayersList.getValue()];

    // Find the object by its index or ID
    const layerIndex = updatedLayersList.findIndex((layer: any) => layer.id === layerID);

    if (layerIndex !== -1) {
      // Update the specified property of the found object
      updatedLayersList[layerIndex][property] = value;
      this.lastUpdatedScreen = updatedLayersList.screenid
      // Update the BehaviorSubject with the new array
      this.LayersList.next(updatedLayersList);
    } else {
      console.error(`Layer with ID ${layerID} not found.`);
    }
  }
  setLayerList(value: Array<any>) {
    this.LayersList.next(value);
  }
  getLayerList(): Array<any> {
    return this.LayersList.value
  }

  getDirtyScreen() {
    return this.lastUpdatedScreen
  }
  resetDirtyScreen() {
    return this.lastUpdatedScreen
  }
}
