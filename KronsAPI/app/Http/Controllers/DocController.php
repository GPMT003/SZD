<?php

namespace App\Http\Controllers;

use App\Indocument;
use App\Outdoc;
use App\Article;
use App\Articlesout;
use App\Item;
use App\Company;
use App\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Storage;


class DocController extends Controller
{
    public function generateReceiptNumber()
    {
        $maxId = Indocument::max('id');
        $receiptNumber = 'KONO-' . str_pad($maxId + 1, 6, '0', STR_PAD_LEFT);
        return response()->json($receiptNumber);
    }

    public function generateReceiptNumberout()
    {
        $maxId = Outdoc::max('id');
        $receiptNumber = 'RNOS-' . str_pad($maxId + 1, 6, '0', STR_PAD_LEFT);
        return response()->json($receiptNumber);
    }

    public function saveItemDetails($articleId, $quantity, $price)
    {
        $item = Item::find($articleId);
        if (!$item) {
            throw new Exception('A megadott cikk nem található az adatbázisban.');
        }

        $currentQuantity = $item->purchased_quantity;
        $outQuantity = $item->issued_quantity;
        $currentTotalCost = $item->purchased_average_cost;

        $newQuantity = $currentQuantity + $quantity;
        $newTotalCost = $currentTotalCost* ($currentQuantity-$outQuantity) + $price * $quantity;

        $newAverageCost = $newTotalCost / ($newQuantity - $outQuantity);

        $item->update([
            'purchased_quantity' => $newQuantity,
            'purchased_average_cost' => $newAverageCost,
        ]);
    }

    public function saveReceipt(Request $request)
    {
        $validated = $request->validate([
            'partnerId' => 'required',
            'date' => 'required|date',
            'receiptNumber' => 'required|unique:indocuments,documentId',
            'rows' => 'required|array',
            'rows.*.articleId' => 'required',
            'rows.*.price' => 'required|numeric',
            'rows.*.quantity' => 'required|integer',
        ]);

        DB::beginTransaction();

        try {
            $receiptId = Indocument::create([
                'pid' => $validated['partnerId'],
                'date' => $validated['date'],
                'documentId' => $validated['receiptNumber'],
            ])->id;

            foreach ($validated['rows'] as $row) {
                Article::create([
                    'did' => $receiptId,
                    'iid' => $row['articleId'],
                    'price' => $row['price'],
                    'volume' => $row['quantity'],
                ]);

                $this->saveItemDetails($row['articleId'], $row['quantity'], $row['price']);
            }

            DB::commit();

            return response()->json(['message' => 'Bizonylat sikeresen mentve!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Hiba történt a mentés során!', 'error' => $e->getMessage()], 500);
        }
    }

    public function saveItemDetailsout($articleId, $quantity, $price)
    {
        $item = Item::find($articleId);
        if (!$item) {
            throw new Exception('A megadott cikk nem található az adatbázisban.');
        }

        $currentQuantity = $item->issued_quantity;
        $currentTotalCost = $item->issued_average_cost * $currentQuantity;

        $newQuantity = $currentQuantity + $quantity;
        $newTotalCost = $currentTotalCost + $price * $quantity;

        $newAverageCost = $newTotalCost / $newQuantity;

        $item->update([
            'issued_quantity' => $newQuantity,
            'issued_average_cost' => $newAverageCost,
            'cost' => ($item->purchased_average_cost - $newAverageCost) * $newQuantity,
        ]);
    }

    public function saveReceiptout(Request $request)
    {
        $validated = $request->validate([
            'projectId' => '',
            'date' => 'required|date',
            'mid' => 'required',
            'receiptNumber' => 'required|unique:outdocuments,documentId',
            'rows' => 'required|array',
            'rows.*.articleId' => 'required',
            'rows.*.price' => 'required|numeric',
            'rows.*.quantity' => 'required|integer',
        ]);

        DB::beginTransaction();

        try {
            $receiptId = Outdoc::create([
                'pid' => $validated['projectId'],
                'date' => $validated['date'],
                'documentId' => $validated['receiptNumber'],
                'mid' => $validated['mid'],
                'comment' => $request->comment
            ])->id;

            foreach ($validated['rows'] as $row) {
                Articlesout::create([
                    'did' => $receiptId,
                    'iid' => $row['articleId'],
                    'price' => $row['price'],
                    'volume' => $row['quantity'],
                    'average' => $this->avgPrice($row['articleId']),
                ]);
                $this->saveItemDetailsout($row['articleId'], $row['quantity'], $row['price']);
            }

            DB::commit();

            return response()->json(['message' => 'Bizonylat sikeresen mentve!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Hiba történt a mentés során!', 'error' => $e->getMessage()], 500);
        }
    }

    public function avgPrice($itemId)
    {
        $item = Item::find($itemId);
        if (!$item) {
            throw new Exception('A megadott cikk nem található az adatbázisban.');
        }
        return $item->purchased_average_cost;
    }

    public function projectReceipts(Request $request)
    {
        $projectId = $request->pid;

        $receipts = Outdoc::join('articlesout', 'outdocuments.id', '=', 'articlesout.did')
            ->select(
                'outdocuments.date',
                'outdocuments.documentId',
                DB::raw('ROUND(SUM(articlesout.price * articlesout.volume),2) as totalAmount'),
                DB::raw('ROUND(SUM(articlesout.average * articlesout.volume),2) as totalAvgCost')
            )
            ->where('outdocuments.pid', $projectId)
            ->groupBy('outdocuments.date', 'outdocuments.documentId')
            ->get();

        return response()->json($receipts);

    return response()->json($receipts);
    }

    public function executeSQL(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return $this->errorResponse('Hibás lekérdezés', $validator->errors(), 422);
        }
    
        $query = $request->input('query');
    
        $forbiddenKeywords = [
            'drop', 'delete', 'update', 'insert', 'alter', 'create', 'replace', 'truncate',
            'rename', 'grant', 'revoke', 'lock', 'unlock', 'set', 'alter user', 'drop user',
            'personal_access_tokens', 'users', 
        ];
    
        if ($this->containsForbiddenKeywords($query, $forbiddenKeywords)) {
            return $this->errorResponse('A megadott lekérdezés tiltott műveletet tartalmaz!', null, 400);
        }
    
        if (!$this->isSelectQuery($query)) {
            return $this->errorResponse('Csak SELECT lekérdezések engedélyezettek!', null, 400);
        }
    
        try {
            $results = DB::select(DB::raw($query));
    
            return response()->json(['results' => $results], 200);
        } catch (\Exception $e) {
            return $this->errorResponse('Hiba történt a lekérdezés végrehajtása során!', $e->getMessage(), 500);
        }
    }
    
    private function containsForbiddenKeywords($query, $keywords)
    {
        foreach ($keywords as $keyword) {
            if (stripos($query, $keyword) !== false) {
                return true;
            }
        }
        return false;
    }
    
    private function isSelectQuery($query)
    {
        return stripos(trim($query), 'select') === 0;
    }
    
    private function errorResponse($message, $errors = null, $statusCode = 400)
    {
        $response = ['message' => $message];
        if ($errors) {
            $response['errors'] = $errors;
        }
        return response()->json($response, $statusCode);
    }

    public function getSettings()
    {
        $settings = Company::first();
        if (!$settings) {
            return response()->json(['message' => 'A beállítások nem találhatók'], 404);
        }
        return $settings;

    }

    public function export(Request $request)
    {
        $result = [
            'income' => $this->Income($request->startDate,$request->endDate),
            'outgoing' => $this->Outgoing($request->startDate,$request->endDate),
            'message' => 'Sikeres adatlekérés',
            'status' => true,
            'start' => $request->startDate,
            'end' => $request->endDate,
            'company' => $this->getSettings()
        ];
        return response()->json($result,200);
    }

    public function Income($s,$e){
        $results = DB::table('items')
        ->join('articles', 'items.id', '=', 'articles.iid')
        ->join('indocuments', 'indocuments.id', '=', 'articles.did')
        ->select('items.id','items.name','items.unit',
        'articles.price','articles.volume',
        'indocuments.documentId','indocuments.date')
        ->whereBetween('indocuments.date', [$s, $e])
        ->get();

        return $results;
    }

    public function Outgoing($s,$e){
        $results = DB::table('items')
        ->join('articlesout', 'articlesout.iid', '=', 'items.id')
        ->join('outdocuments', 'articlesout.did', '=', 'outdocuments.id')
        ->select('items.id','items.name','items.unit',
        'articlesout.average','articlesout.volume',
        'outdocuments.documentId','outdocuments.date')
        ->whereBetween('outdocuments.date', [$s, $e])
        ->get();

        return $results;
    }

    public function savePdf(Request $request)
    {
        $validated = $request->validate([
            'pdf' => 'required|string', 
            'invoice_number' => 'required|string|max:255', 
        ]);
    

        $pdfData = $validated['pdf'];
        $pdf = base64_decode($pdfData, true); 
    
        if ($pdf === false) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid base64 PDF data.',
            ], 400); 
        }
    
        $invoiceNumber = $validated['invoice_number'];
        $fileName = "invoice_{$invoiceNumber}.pdf";
        $filePath = 'invoices/' . $fileName;
    
        if (!Storage::disk('public')->exists('invoices')) {
            Storage::disk('public')->makeDirectory('invoices');
        }
    
        try {
            $stored = Storage::disk('public')->put($filePath, $pdf);
    
            if (!$stored) {
                throw new \Exception('Failed to store PDF.');
            }
    
            $fullUrl = Storage::url($filePath);
    
            $this->savePath($fullUrl, $invoiceNumber);
    
            return response()->json([
                'success' => true,
                'message' => 'PDF successfully saved and path updated.',
                'url' => $fullUrl, 
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error saving PDF.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }
    
    public function savePath($path, $invoiceNumber)
    {
        try {
            Document::updateOrCreate(
                ['DocNumber' => $invoiceNumber],
                ['path' => $path]
            );
    
            return response()->json([
                'success' => true,
                'message' => 'PDF path successfully updated.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating path.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }
    
    public function getDocList()
    {
        $doc = Document::all();
        return response()->json(['doc' => $doc, 'status' => true], 200);

    }

}
