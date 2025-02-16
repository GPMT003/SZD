<?php

namespace App\Http\Controllers;

use App\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartnerController extends Controller
{
    public function index()
    {
        $partners = Partner::all();
        return response()->json($partners, 200);
    }

    public function show($id)
    {
        $partner = Partner::find($id);

        if (!$partner) {
            return response()->json(['message' => 'Partner nem található', 'status' => false], 404);
        }

        return response()->json($partner, 200);
    }

    private function validatePartner(Request $request, $id = null)
    {
        return Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:partners,name,' . ($id ?? 'NULL') . ',id',
            'taxNumber' => 'required|string|unique:partners,taxNumber,' . ($id ?? 'NULL') . ',id',
            'address' => 'required|string|max:255'
        ], [
            'name.required' => 'A név megadása kötelező.',
            'name.string' => 'A név csak szöveg lehet.',
            'name.max' => 'A név legfeljebb 255 karakter hosszú lehet.',
            'name.unique' => 'A név már létezik az adatbázisban.',
            'taxNumber.required' => 'Az adószám megadása kötelező.',
            'taxNumber.numeric' => 'Az adószám csak szám lehet.',
            'taxNumber.unique' => 'Az adószám már létezik az adatbázisban.',
            'address.required' => 'A cím megadása kötelező.',
            'address.string' => 'A cím csak szöveg lehet.',
            'address.max' => 'A cím legfeljebb 255 karakter hosszú lehet.'
        ]);
    }    

    public function store(Request $request)
    {
        $validator = $this->validatePartner($request);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }

        Partner::create($request->all());

        return response()->json(['message' => 'Sikeres hozzáadás', 'status' => true], 201);
    }

    public function update(Request $request)
    {
        $validator = $this->validatePartner($request, $request->id);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }

        $partner = Partner::find($request->id);

        if (!$partner) {
            return response()->json(['message' => 'Partner nem található' , 'status' => false], 404);
        }

        $partner->update($request->all());

        return response()->json(['message' => 'Sikeres frissítés', 'status' => true], 200);
    }
}

