<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'model' => 'required|string',
            'type' => 'required|string',
            'brand' => 'required|string',
            'year' => 'required|integer',
            'price' => 'required|numeric',
            'passengers' => 'required|integer',
            'transmission' => 'required|string',
            'image' => 'string',
            'licenses' => 'string|required'
        ];
    }
}
