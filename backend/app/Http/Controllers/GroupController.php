<?php

namespace App\Http\Controllers;

use App\Http\Resources\Group\GroupResource;
use App\Services\GroupService;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function __construct(protected GroupService $service)
    {

    }

    public function index(Request $request)
    {
        return $this->sendSuccessResponse(
            'Groups retrieved successful',
            GroupResource::collection($this->service->groupCollection())
        );
    }
}
