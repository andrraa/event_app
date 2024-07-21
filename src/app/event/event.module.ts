import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';

import { EventComponent } from './event/event.component';
import { TicketComponent } from './ticket/ticket.component';
import { TransactionComponent } from './transaction/transaction.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EventComponent, TicketComponent, TransactionComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class EventModule {}
