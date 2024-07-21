import { Component } from '@angular/core';
import { TicketService } from '../services/ticket/ticket.service';
import { AlertService } from '../../services/alert/alert.service';
import { ApiResponse } from '../../models/response.model';
import {
  TicketCreateRequest,
  TicketCreateSuccess,
} from '../../models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventUtilitySuccess } from '../../models/utility.model';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  constructor(
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private utilityService: UtilityService
  ) {
    this.ticketList();
  }

  // Ticket List
  isLoadingTicketList: boolean = false;

  tickets: TicketCreateSuccess[] = [];

  async ticketList() {
    this.isLoadingTicketList = true;

    try {
      const result: ApiResponse<TicketCreateSuccess[]> =
        await this.ticketService.tickets();

      if (result.data != undefined) {
        this.tickets = result.data;
      }

      this.isLoadingTicketList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingTicketList = false;
    }
  }

  // Ticket Delete
  async delete(id: number) {
    try {
      const result = await this.ticketService.delete(id);

      if (result) {
        this.ticketList();
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }

  // Ticket Create
  isShowingTicketForm: boolean = false;

  ticketForm: FormGroup = this.formBuilder.group({
    event_id: [null, Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    quota: ['', Validators.required],
    information: [''],
  });

  async create() {
    const ticketData = this.ticketForm.value;

    const request: TicketCreateRequest = {
      event_id: ticketData.event_id,
      name: ticketData.name,
      price: ticketData.price,
      quota: ticketData.quota,
      information: ticketData.information,
    };

    if (this.isUpdate) {
      try {
        const result = await this.ticketService.update(
          request,
          this.currentTicketId
        );

        if (result.code === 200) {
          this.toggleTicketForm();
          this.ticketForm.reset();
          this.currentTicketId = 0;

          this.alert.showToast({
            icon: 'success',
            title: 'Ticket updated successfully!',
          });

          this.ticketList();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    } else {
      try {
        const result = await this.ticketService.create(request);

        if (result.code === 201) {
          this.toggleTicketForm();
          this.ticketForm.reset();

          this.alert.showToast({
            icon: 'success',
            title: 'Ticket created successfully!',
          });

          this.ticketList();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    }
  }

  toggleTicketForm(): void {
    this.isShowingTicketForm = !this.isShowingTicketForm;
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

  // Edit
  isUpdate: boolean = false;
  currentTicketId: number = 0;

  update(item: TicketCreateSuccess) {
    this.isUpdate = true;
    this.currentTicketId = item.id;

    const data: EventUtilitySuccess = {
      id: item.event.id,
      name: item.event.name,
    };

    this.eventList.push(data);

    this.ticketForm.patchValue({
      event_id: item.event.id,
      name: item.name,
      price: item.price,
      quota: item.quota,
      information: item.information,
    });

    this.toggleTicketForm();
  }
}
