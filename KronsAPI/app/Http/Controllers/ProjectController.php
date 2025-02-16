<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{

    public function index()
    {
        $projects = Project::all();
        return response()->json($projects, 200);
    }

    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'A projekt nem található', 'status' => false], 404);
        }

        return response()->json($project, 200);
    }

  
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:projects,name',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'contract_amount' => 'required|numeric|min:0',
            'contractor_name' => 'required|string|max:255',
            'partner_id' => 'required|exists:partners,id',
            'completion_level' => 'required|integer|between:0,100',
        ], $this->ValMSg());


        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }


        $project = Project::create([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'contract_amount' => $request->contract_amount,
            'contractor_name' => $request->contractor_name,
            'partner_id' => $request->partner_id,
            'completion_level' => $request->completion_level,
            'planned_phases' => $request->planned_phases,
        ]);

        return response()->json(['message' => 'A projekt sikeresen hozzáadva', 'status' => true], 201);
    }

 
    public function update(Request $request)
    {
        $id = $request->id;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:projects,name,' . $id,
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'contract_amount' => 'required|numeric|min:0',
            'contractor_name' => 'required|string|max:255',
            'partner_id' => 'required|exists:partners,id',
            'completion_level' => 'required|integer|between:0,100',
        ], $this->ValMSg());


        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => false], 400);
        }


        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'A projekt nem található', 'status' => false], 404);
        }

    
        $project->update([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'contract_amount' => $request->contract_amount,
            'contractor_name' => $request->contractor_name,
            'partner_id' => $request->partner_id,
            'completion_level' => $request->completion_level,
            'planned_phases' => $request->planned_phases,
        ]);

        return response()->json(['message' => 'A projekt sikeresen frissítve', 'status' => true], 200);
    }

    private function ValMsg() {
        return [
            'name.required' => 'A projekt neve kötelező.',
            'name.string' => 'A projekt neve csak szöveg lehet.',
            'name.max' => 'A projekt neve legfeljebb 255 karakter hosszú lehet.',
            'name.unique' => 'Ez a projekt név már létezik.',
            'start_date.required' => 'A kezdési dátum kötelező.',
            'start_date.date' => 'A kezdési dátum érvényes dátum kell legyen.',
            'end_date.required' => 'A befejezési dátum kötelező.',
            'end_date.date' => 'A befejezési dátum érvényes dátum kell legyen.',
            'end_date.after_or_equal' => 'A befejezési dátumnak később vagy egybeesnie kell a kezdési dátummal.',
            'contract_amount.required' => 'A szerződéses összeg kötelező.',
            'contract_amount.numeric' => 'A szerződéses összeg számnak kell lennie.',
            'contract_amount.min' => 'A szerződéses összeg nem lehet negatív.',
            'contractor_name.required' => 'A vállalkozó neve kötelező.',
            'contractor_name.string' => 'A vállalkozó neve csak szöveg lehet.',
            'contractor_name.max' => 'A vállalkozó neve legfeljebb 255 karakter hosszú lehet.',
            'partner_id.required' => 'A partner azonosítója kötelező.',
            'partner_id.exists' => 'A megadott partner nem létezik.',
            'completion_level.required' => 'A befejezettségi szint kötelező.',
            'completion_level.integer' => 'A befejezettségi szint számnak kell lennie.',
            'completion_level.between' => 'A befejezettségi szint 0 és 100 között lehet.',
        ];
    }
}
