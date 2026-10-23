<?php

namespace App\Http\Controllers;

use App\Http\Requests\Group\AddMemberRequest;
use App\Http\Requests\Group\GroupStoreRequest;
use App\Http\Resources\Group\GroupResource;
use App\Http\Resources\Group\MinifiedGroupResource;
use App\Models\Group;
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

    public function show(Request $request, Group $group)
    {
        return $this->sendSuccessResponse(
            'Group retrieved successful',
            new GroupResource($group)
        );
    }

    public function destroy(Request $request, Group $group)
    {
        $group->delete();
        return $this->sendSuccessResponse(
            'Group delete successful',
            null,
            Response::HTTP_NO_CONTENT
        );
    }

    public function addMember(AddMemberRequest $request, Group $group)
    {
        $attributes = $request->validated();

        $group->users()->attach($attributes['usersIds']);

        return $this->sendSuccessResponse(
            'Member added to the group',
            new GroupResource($group->load(['owner', 'users'])),
            Response::HTTP_CREATED
        );
    }
}
