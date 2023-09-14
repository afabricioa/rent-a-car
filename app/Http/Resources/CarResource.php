<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'model' => $this->model,
            'type' => $this->type,
            'brand' => $this->brand,
            'available' => $this->available,
            'year' => $this->year,
            'price' => $this->price,
            'passengers' => $this->passengers,
            'transmission' => $this->transmission,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'licenses' => $this->licenses
        ];
    }
}
