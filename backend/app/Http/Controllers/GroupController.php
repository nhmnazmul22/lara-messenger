<?php

namespace App\Http\Controllers;

use App\Http\Requests\Group\GroupStoreRequest;
use App\Http\Resources\Group\GroupResource;
use App\Http\Resources\Group\MinifiedGroupResource;
use App\Services\GroupService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends Controller
{
    public function __construct(protected GroupService $service)
    {

    }

    public function index(Request $request)
    {
        return $this->sendSuccessResponse(
            'Groups retrieved successful',
            MinifiedGroupResource::collection($this->service->groupCollection())
        );
    }

    public function store(GroupStoreRequest $request)
    {
        $result = $this->service->createNewGroup($request->validated());

        return $this->sendSuccessResponse(
            'Group created successfully',
            new GroupResource($result),
            Response::HTTP_CREATED
        );
    }
}
