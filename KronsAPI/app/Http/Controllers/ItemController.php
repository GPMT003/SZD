<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items, 200);
    }

    public function show($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'A termék nem található', 'status' => false], 404);
        }

        return response()->json($item, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'accountNumber' => 'required|string|max:255',
            'itemNumber' => 'required|string|max:255|unique:items,itemNumber',
            'name' => 'required|string|max:255',
            'vatContent' => 'required',
            'vtsz' => 'max:255',
            'unit' => 'required|string|max:255',
            'purchasePrice' => 'required|numeric|min:0',
        ],$this->ValMsg() );


        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }

        $item = Item::create([
            'accountNumber' => $request->accountNumber,
            'itemNumber' => $request->itemNumber,
            'name' => $request->name,
            'vatContent' => $request->vatContent,
            'vtsz' => $request->vtsz,
            'unit' => $request->unit,
            'purchasePrice' => $request->purchasePrice,
        ]);

        return response()->json(['message' => 'A termék sikeresen hozzáadva', 'status' => true], 201);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $validator = Validator::make($request->all(), [
            'accountNumber' => 'required|string|max:255',
            'itemNumber' => 'required|string|max:255|unique:items,itemNumber,' . $id,
            'name' => 'required|string|max:255',
            'vatContent' => 'required',
            'vtsz' => 'max:255',
            'unit' => 'required|string|max:255',
            'purchasePrice' => 'required|numeric|min:0',
        ], $this->ValMsg());

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }

        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'A termék nem található', 'status' => false], 404);
        }

        $item->update([
            'accountNumber' => $request->accountNumber,
            'itemNumber' => $request->itemNumber,
            'name' => $request->name,
            'vatContent' => $request->vatContent,
            'vtsz' => $request->vtsz,
            'unit' => $request->unit,
            'purchasePrice' => $request->purchasePrice,
        ]);

        return response()->json(['message' => 'A termék sikeresen frissítve', 'status' => true], 200);
    }

    private function ValMsg(){
        return [
            'accountNumber.required' => 'A számlaszám kötelező.',
            'accountNumber.string' => 'A számlaszámnak szövegnek kell lennie.',
            'accountNumber.max' => 'A számlaszám legfeljebb 255 karakter hosszú lehet.',
            'itemNumber.required' => 'A termék szám kötelező.',
            'itemNumber.string' => 'A termék számnak szövegnek kell lennie.',
            'itemNumber.max' => 'A termék szám legfeljebb 255 karakter hosszú lehet.',
            'itemNumber.unique' => 'Ez a termék szám már létezik.',
            'name.required' => 'A termék neve kötelező.',
            'name.string' => 'A termék neve szövegnek kell lennie.',
            'name.max' => 'A termék neve legfeljebb 255 karakter hosszú lehet.',
            'vatContent.required' => 'A ÁFA tartalom kötelező.',
            'vatContent.numeric' => 'Az ÁFA tartalom számnak kell lennie.',
            'vatContent.min' => 'Az ÁFA tartalom nem lehet negatív.',
            'vatContent.max' => 'Az ÁFA tartalom nem lehet több mint 100%.',
            'vtsz.required' => 'A VTSZ kód kötelező.',
            'vtsz.string' => 'A VTSZ kódnak szövegnek kell lennie.',
            'vtsz.max' => 'A VTSZ kód legfeljebb 255 karakter hosszú lehet.',
            'unit.required' => 'Az egység kötelező.',
            'unit.string' => 'Az egység szövegnek kell lennie.',
            'unit.max' => 'Az egység legfeljebb 255 karakter hosszú lehet.',
            'purchasePrice.required' => 'A beszerzési ár kötelező.',
            'purchasePrice.numeric' => 'A beszerzési ár számnak kell lennie.',
            'purchasePrice.min' => 'A beszerzési ár nem lehet negatív.',
        ];
    }
}