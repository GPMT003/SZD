<?php

namespace App\Http\Controllers;

use App\Move;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MoveController extends Controller
{
    public function index()
    {
        $moves = Move::all();
        return response()->json($moves, 200);
    }

    public function show($id)
    {
        $move = Move::find($id);

        if (!$move) {
            return response()->json(['message' => 'A mozgás nem található', 'status' => false], 404);
        }

        return response()->json($move, 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'moveType' => 'required|string|max:255|unique:moves',
            'accountNumber' => 'required|numeric|unique:moves'
        ], [
            'moveType.required' => 'A mozgás típusa kötelező.',
            'moveType.string' => 'A mozgás típusa csak szöveg lehet.',
            'moveType.max' => 'A mozgás típusa legfeljebb 255 karakter hosszú lehet.',
            'moveType.unique' => 'Ez a mozgás típus már létezik.',
            'accountNumber.required' => 'A számlaszám kötelező.',
            'accountNumber.numeric' => 'A számlaszámnak számnak kell lennie.',
            'accountNumber.unique' => 'Ez a számlaszám már létezik.',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }
    
        Move::create([
            'moveType' => $request->moveType,
            'accountNumber' => $request->accountNumber,
            'isBV' => $request->isBV
        ]);
    
        return response()->json(['message' => 'A mozgás sikeresen hozzáadva', 'status' => true], 201);
    }
    
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'moveType' => 'required|string|max:255|unique:moves,moveType,' . $request->id,
            'accountNumber' => 'required|numeric|unique:moves,accountNumber,' . $request->id
        ], [
            'moveType.required' => 'A mozgás típusa kötelező.',
            'moveType.string' => 'A mozgás típusa csak szöveg lehet.',
            'moveType.max' => 'A mozgás típusa legfeljebb 255 karakter hosszú lehet.',
            'moveType.unique' => 'Ez a mozgás típus már létezik.',
            'accountNumber.required' => 'A számlaszám kötelező.',
            'accountNumber.numeric' => 'A számlaszámnak számnak kell lennie.',
            'accountNumber.unique' => 'Ez a számlaszám már létezik.',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }
    
        $move = Move::find($request->id);
    
        if (!$move) {
            return response()->json(['message' => 'A mozgás nem található', 'status' => false], 404);
        }
    
        $move->update([
            'moveType' => $request->moveType,
            'accountNumber' => $request->accountNumber,
            'isBV' => $request->isBV
        ]);
    
        return response()->json(['message' => 'A mozgás sikeresen frissítve', 'status' => true], 200);
    }

    public function destroy($id)
    {
        $move = Move::find($id);

        if (!$move) {
            return response()->json(['message' => 'A mozgás nem található', 'status' => false], 404);
        }

        $move->delete();

        return response()->json(['message' => 'A mozgás sikeresen törölve', 'status' => true], 204);
    }
}
