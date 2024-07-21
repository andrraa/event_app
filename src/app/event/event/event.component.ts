import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CategoryUtilitySuccess,
  EventUtilitySuccess,
  ProvinceUtilitySuccess,
} from '../../models/utility.model';
import { UtilityService } from '../../services/utility/utility.service';
import { AlertService } from '../../services/alert/alert.service';
import { ApiResponse } from '../../models/response.model';
import { EventCreateSuccess } from '../../models/event.model';
import { EventService } from '../services/event/event.service';
import { Environment } from '../../../environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  constructor(
    private alert: AlertService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) {
    this.listEvents();
  }

  isShowingForm: boolean = false;

  toggleFormVisibility(): void {
    this.isShowingForm = !this.isShowingForm;
  }

  // Event List
  isLoadingListEvent: boolean = false;

  listEvent: EventCreateSuccess[] = [];

  async listEvents() {
    this.isLoadingListEvent = true;

    try {
      const result: ApiResponse<EventCreateSuccess[]> =
        await this.eventService.events();

      if (result.data != undefined) {
        this.listEvent = result.data;
      }

      this.isLoadingListEvent = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingListEvent = false;
    }
  }

  // Event Form
  eventForm: FormGroup = this.formBuilder.group({
    event_id: ['', Validators.required],
    location: ['', Validators.required],
    province_id: ['', Validators.required],
    category_id: ['', Validators.required],
    description: ['', Validators.required],
    information: ['', Validators.required],
    image: [null, Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });

  async onSubmit() {
    const formData = new FormData();

    const startDate = this.formatDateTime(
      this.eventForm.get('start_date')?.value
    );
    const endDate = this.formatDateTime(this.eventForm.get('end_date')?.value);

    Object.entries(this.eventForm.controls).forEach(([key, control]) => {
      if (control.value === null || control.value === undefined) {
        return;
      }

      if (key === 'image') {
        const imageFile = control.value;

        if (imageFile instanceof File) {
          formData.append(key, imageFile, imageFile.name);
        }
      } else {
        formData.append(key, control.value);
      }
    });

    formData.append('start_date', startDate);
    formData.append('end_date', endDate);

    if (this.isUpdate) {
      try {
        const result = await this.eventService.update(
          this.currentEventId,
          formData
        );

        if (result.code === 200) {
          this.alert.showToast({
            icon: 'success',
            title: 'Event updated successfully!',
          });

          this.currentEventId = 0;
          this.isShowingForm = false;

          this.listEvents();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    } else {
      try {
        const result: ApiResponse<EventCreateSuccess> =
          await this.eventService.create(formData);

        if (result.code == 201) {
          this.alert.showToast({
            icon: 'success',
            title: 'Event created successfully!',
          });

          this.eventForm.reset();
          this.isShowingForm = false;
          this.isUpdate = false;
          this.currentEventId = 0;

          this.listEvents();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({
        image: file,
      });
    }
  }

  private formatDateTime(dateTime: string | null): string {
    if (!dateTime) {
      return '';
    }

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Delete Events
  async delete(id: string) {
    try {
      const result: boolean = await this.eventService.delete(id);

      if (result) {
        this.listEvents();
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }

  // Get Events Dropdown
  isLoadingEventList: boolean = false;
  eventList: EventUtilitySuccess[] = [];

  async events() {
    this.isLoadingEventList = true;

    try {
      const result: ApiResponse<EventUtilitySuccess[]> =
        await this.utilityService.events();

      if (result.data != undefined) {
        this.eventList = result.data;
      }

      this.isLoadingEventList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingEventList = false;
    }
  }

  // Get Provinces Dropdown
  isLoadingProvinceList: boolean = false;
  provinceList: ProvinceUtilitySuccess[] = [];

  async provinces() {
    this.isLoadingProvinceList = true;

    try {
      const result: ApiResponse<ProvinceUtilitySuccess[]> =
        await this.utilityService.provinces();

      if (result.data != undefined) {
        this.provinceList = result.data;
      }

      this.isLoadingProvinceList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingProvinceList = false;
    }
  }

  // Get Categories Dropdown
  isLoadinCategoryList: boolean = false;
  categoryList: CategoryUtilitySuccess[] = [];

  async categories() {
    this.isLoadinCategoryList = true;

    try {
      const result: ApiResponse<CategoryUtilitySuccess[]> =
        await this.utilityService.categories();

      if (result.data != undefined) {
        this.categoryList = result.data;
      }

      this.isLoadinCategoryList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadinCategoryList = false;
    }
  }

  // Update Event
  isUpdate: boolean = false;
  currentEventId: number = 0;

  update(item: EventCreateSuccess) {
    this.isUpdate = true;
    this.currentEventId = item.id;

    this.eventList.push({
      id: item.event.id,
      name: item.event.name,
    });

    this.provinceList.push({
      id: item.province.id,
      province_name: item.province.province_name,
    });

    this.categoryList.push({
      id: item.category.id,
      category_name: item.category.category_name,
    });

    this.eventForm.patchValue({
      event_id: item.event.id,
      location: item.location,
      province_id: item.province.id,
      category_id: item.category.id,
      description: item.description,
      information: item.information,
      start_date: item.start_date,
      end_date: item.end_date,
    });

    this.toggleFormVisibility();
  }

  // Show Image
  showImage(image: string): string {
    const IMAGE_URL: string = Environment.imageBaseUrl + image;

    return IMAGE_URL;
  }
}
