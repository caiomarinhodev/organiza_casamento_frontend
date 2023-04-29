import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppInjector } from '../../app.injector';

import { BaseItemComponent } from './base-item.component';

/**
 * The 'BaseEditComponent' provides the common API for edit component.
 *
 * Service, operations, forms, validations are all available.
 *
 * All edit components MUST extend this class.
 *
 * @extends BaseItemComponent
 *
 * @property {any}          item      - item which is being edited.
 */
@Injectable()
export abstract class BaseCreateComponent extends BaseItemComponent implements OnInit {

    /**
     * Builder for the form.
     *
     * @type {FormBuilder}
     */
    protected formBuilder: FormBuilder = AppInjector.get(FormBuilder);

    public submitting = false;

    //@ts-ignore
    public customInsertMessage: string = null;

    /**
     * Form for edition.
     */
    //@ts-ignore
    public createForm: FormGroup;

    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    /**
     * On Init of the component.
     */
    override ngOnInit(): void {
        super.ngOnInit();
        this.submitting = false;
        this.initForm();
    }

    /**
     * Initialize the edit form.
     */
    initForm(): void {
        this.createForm = this.formBuilder.group(
            this.getFormControls()
        );
    }

    /**
     * Invoked when user submits the form.
     *
     * Checks if the item's id exists:
     * - No:  Inserts the item.
     * - Yes: Updates the item.
     *
     * Notifies by a 'toast' at the end: Success or Error.
     *
     * If success, go back to the list component.
     */
    onSubmit(): void {
        this.submitting = true;
        this.preInsert();
        this.insert();
    }

    /**
     * Gets the form value.
     *
     * @returns {any}
     */
    protected getFormValue() {
        return this.createForm.value;
    }

    /**
     * Inserts the item.
     */
    protected insert(): void {
        this.service.insert(this.getServiceURL(), this.getFormValue()).subscribe(
            result => {
                this.submitting = false;
                this.postInsert(result);
                if (this.customInsertMessage != null) {
                    this.notification.successText(this.customInsertMessage);
                } else {
                    this.notification.insertSuccess();
                }
                this.backToList();
            },
            error => {
                this.submitting = false;
                if (error.status !== 0) {
                    this.notification.error(error.error ? error.error.message : error.message);
                }
            }
        );
    }

    /**
     * Executes before insert operation.
     */
    protected preInsert(): void {

    }

    /**
     * Executes post successful insert.
     */
    //@ts-ignore
    protected postInsert(result): void {

    }

    /**
     * Gets the form controls.
     *
     * @returns {Object}
     */
    abstract getFormControls(): Object;

}
