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
export abstract class BaseDeleteComponent extends BaseItemComponent implements OnInit {

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
    public deleteForm: FormGroup;

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
        this.deleteForm = this.formBuilder.group(
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
        this.preDelete();
        this.delete();
    }

    /**
     * Gets the form value.
     *
     * @returns {any}
     */
    protected getFormValue() {
        return this.deleteForm.value;
    }

    protected postDelete(): void {
    }

    delete(): void {
        this.service.remove(this.getServiceURL(), this.item.id).subscribe(
            result => {
                this.submitting = false;
                this.postDelete();
                this.notification.deleteSuccess();
                this.backToList();
            },
            error => {
                this.submitting = false;
                this.notification.error(error.error ? error.error.message : error.message);
            }
        );
    }


    /**
     * Fills the form with the item retrieved.
     *
     * @override
     */
    //@ts-ignore
    protected postGetItem(): void {
        this.deleteForm.setValue(this.item);
    }


    /**
     * Executes before update operation.
     */
    protected preDelete(): void {

    }

    /**
     * Gets the form controls.
     *
     * @returns {Object}
     */
    abstract getFormControls(): Object;

}
