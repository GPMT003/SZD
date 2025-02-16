<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function getSettings()
    {
        $settings = Company::first();
        if (!$settings) {
            return response()->json(['message' => 'A beállítások nem találhatók'], 404);
        }
        return response()->json($settings);

    }

    public function saveSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'companyName' => 'required|string|max:255',
            'taxNumber' => 'required|string|max:255',
            'vatNumber' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'valuationMethod' => [
                'required',
                'string',
                Rule::in(['Fifo', 'AverageCost', 'PurchaseCost', 'AccountingCost']),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $this->translateValidationErrors($validator->errors()),
                "status" => false
            ], 400);
        }

        try {
            $settings = Company::first();

            if ($settings) {
                $settings->update([
                    'companyName' => $request->companyName,
                    'taxNumber' => $request->taxNumber,
                    'vatNumber' => $request->vatNumber,
                    'location' => $request->location,
                    'valuationMethod' => $request->valuationMethod,
                ]);
            } else {
                Company::create([
                    'companyName' => $request->companyName,
                    'taxNumber' => $request->taxNumber,
                    'vatNumber' => $request->vatNumber,
                    'location' => $request->location,
                    'valuationMethod' => $request->valuationMethod,
                ]);
            }

            return response()->json(['message' => 'A beállítások sikeresen elmentve', "status" => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'A beállítások mentése nem sikerült', 'error' => $e->getMessage(), "status" => false], 500);
        }
    }

    /**
     *
     * @param \Illuminate\Support\MessageBag $errors
     * @return array
     */
    private function translateValidationErrors($errors)
    {
        $translatedErrors = [];

        foreach ($errors->all() as $error) {
            switch ($error) {
                case 'The company name field is required.':
                    $translatedErrors[] = 'A cég neve mező kötelező.';
                    break;
                case 'The tax number field is required.':
                    $translatedErrors[] = 'A adószám mező kötelező.';
                    break;
                case 'The vat number field is required.':
                    $translatedErrors[] = 'A közösségi adószám mező kötelező.';
                    break;
                case 'The location field is required.':
                    $translatedErrors[] = 'A helyszín mező kötelező.';
                    break;
                case 'The valuation method field is required.':
                    $translatedErrors[] = 'A értékelési mód mező kötelező.';
                    break;
                case 'The valuation method must be one of the following values: Fifo, AverageCost, PurchaseCost, AccountingCost.':
                    $translatedErrors[] = 'Az értékelési módnak az alábbi értékek egyikének kell lennie: Fifo, AverageCost, PurchaseCost, AccountingCost.';
                    break;
                default:
                    $translatedErrors[] = $error;
                    break;
            }
        }

        return $translatedErrors;
    }
}
